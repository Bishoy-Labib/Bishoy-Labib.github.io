/**
 * lightbox.js — Unified image / video / GIF viewer
 *
 * Supported types (auto-detected by file extension):
 *   Images : .jpg  .jpeg  .png  .webp  .avif  .svg  .gif
 *   Video  : .mp4  .webm  .ogg  .ogv  .mov
 *
 * Setup per project page (3 steps):
 * ─────────────────────────────────
 * 1. In <head>:
 *      <link rel="stylesheet" href="../css/lightbox.css">
 *
 * 2. HTML block (paste once anywhere in <body>):
 *      <div id="lb" onclick="LB.outside(event)" role="dialog" aria-modal="true">
 *        <span id="lb-counter"></span>
 *        <span id="lb-type-badge">VIDEO</span>
 *        <button id="lb-close"  onclick="LB.close()">&#x2715;</button>
 *        <button class="lb-arrow" id="lb-prev" onclick="LB.step(-1)">&#8592;</button>
 *        <div id="lb-media-wrap">
 *          <img   id="lb-img" src="" alt="" draggable="false">
 *          <video id="lb-vid" controls autoplay playsinline></video>
 *        </div>
 *        <button class="lb-arrow" id="lb-next" onclick="LB.step(1)">&#8594;</button>
 *      </div>
 *
 * 3. Before </body>:
 *      <script src="../js/lightbox.js"></script>
 *      <script>
 *        LB.init([
 *          { src: '../images/Foo/IMG1.jpg' },
 *          { src: '../images/Foo/IMG2.mp4' },
 *        ]);
 *      </script>
 *
 * Gallery tiles:
 *   <div class="gal-item" onclick="LB.open(0)"><img src="..."></div>
 *   <div class="gal-item is-video" onclick="LB.open(1)">
 *     <video src="..." muted autoplay loop playsinline preload="metadata"></video>
 *   </div>
 */

(function (global) {
    'use strict';

    var VIDEO_EXT = /\.(mp4|webm|ogg|ogv|mov)(\?.*)?$/i;
    function isVid(src) { return VIDEO_EXT.test(src); }

    var media = [];
    var cur = 0;

    // DOM elements — grabbed once on first call
    var lb, lbImg, lbVid, lbCtr, lbBadge;
    var ready = false;

    function grab() {
        if (ready) return;
        lb = document.getElementById('lb');
        lbImg = document.getElementById('lb-img');
        lbVid = document.getElementById('lb-vid');
        lbCtr = document.getElementById('lb-counter');
        lbBadge = document.getElementById('lb-type-badge');
        ready = true;
    }

    /* ── Core display logic ───────────────────────────────────────────── */

    function counter() {
        if (lbCtr) lbCtr.textContent = (cur + 1) + ' / ' + media.length;
    }

    function showImage(src) {
        // Stop any running video without nuking the element state
        lbVid.pause();
        lbVid.style.display = 'none';
        lbVid.removeAttribute('src');   // safe here — we are switching TO image
        lbVid.load();

        if (lbBadge) lbBadge.classList.remove('lb-show');
        lbImg.src = src;
        lbImg.style.display = 'block';
        lbImg.classList.remove('lb-fading');
    }

    function showVideo(src) {
        // Hide image
        lbImg.style.display = 'none';
        if (lbBadge) lbBadge.classList.add('lb-show');

        /*
         * The ONLY reliable way to switch MP4 src on a <video> element:
         *   1. Assign a fresh src attribute  (no src='' first — that breaks Chrome)
         *   2. Call load() to restart the media engine
         *   3. Call play() immediately — it queues until enough data is available
         * The `autoplay` HTML attribute is also present as belt-and-suspenders.
         */
        lbVid.src = src;
        lbVid.style.display = 'block';
        lbVid.classList.remove('lb-fading');
        lbVid.load();
        lbVid.play().catch(function (err) {
            // AbortError is expected when play() is interrupted by another play() call.
            // NotAllowedError means autoplay was blocked — video will sit paused, user can press play.
            if (err.name !== 'AbortError') {
                console.warn('[LB] video play() blocked:', err.message);
            }
        });
    }

    function applyItem(idx) {
        var item = media[idx];
        cur = idx;
        counter();
        if (isVid(item.src)) {
            showVideo(item.src);
        } else {
            showImage(item.src);
        }
    }

    function fadeAndShow(idx) {
        // Figure out which element is currently visible
        var current = (lbVid.style.display === 'block') ? lbVid : lbImg;
        current.classList.add('lb-fading');
        setTimeout(function () {
            current.classList.remove('lb-fading');
            applyItem(idx);
        }, 160);
    }

    /* ── Public API ───────────────────────────────────────────────────── */

    var LB = {

        /**
         * Initialise with an array of { src } objects.
         * Type is auto-detected from the file extension.
         */
        init: function (manifest) {
            media = manifest || [];

            // Keyboard shortcuts
            document.addEventListener('keydown', function (e) {
                if (!lb || !lb.classList.contains('active')) return;
                if (e.key === 'ArrowLeft') { e.preventDefault(); LB.step(-1); }
                if (e.key === 'ArrowRight') { e.preventDefault(); LB.step(1); }
                if (e.key === 'Escape') { e.preventDefault(); LB.close(); }
            });

            // Touch swipe — attach as soon as DOM exists
            function attachSwipe() {
                var el = document.getElementById('lb');
                if (!el) return;
                var tx = 0;
                el.addEventListener('touchstart', function (e) {
                    tx = e.changedTouches[0].clientX;
                }, { passive: true });
                el.addEventListener('touchend', function (e) {
                    if (e.target.tagName === 'VIDEO') return;
                    var dx = e.changedTouches[0].clientX - tx;
                    if (Math.abs(dx) > 50) LB.step(dx < 0 ? 1 : -1);
                }, { passive: true });
            }

            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', attachSwipe);
            } else {
                attachSwipe();
            }
        },

        /** Open at index (no fade on first open). */
        open: function (idx) {
            grab();
            lb.classList.add('active');
            document.body.style.overflow = 'hidden';
            applyItem(idx);
        },

        /** Close and fully stop the video. */
        close: function () {
            grab();
            lb.classList.remove('active');
            document.body.style.overflow = '';
            lbVid.pause();
            lbVid.removeAttribute('src');
            lbVid.load();
            lbImg.src = '';
            lbImg.style.display = 'none';
            lbVid.style.display = 'none';
        },

        /** Navigate to the next or previous item with a fade. */
        step: function (dir) {
            grab();
            var next = (cur + dir + media.length) % media.length;
            fadeAndShow(next);
        },

        /** Click-on-backdrop handler. */
        outside: function (e) {
            if (e.target === lb) LB.close();
        }
    };

    global.LB = LB;

}(window));
