// 图片点击放大功能（配合 extra.css 样式）
(function() {
    'use strict';
    
    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initZoom);
    } else {
        initZoom();
    }
    
    function initZoom() {
        // 获取所有图片（排除图表、代码块中的图片）
        const images = document.querySelectorAll('.md-typeset img:not(.mermaid img):not(.highlight img)');
        
        images.forEach(img => {
            // 跳过已经是链接的图片（避免冲突）
            if (img.closest('a')) return;
            
            // 添加点击事件
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                openZoomImage(this);
            });
        });
    }
    
    function openZoomImage(img) {
        // 获取原图地址（优先使用 data-original 属性，否则用 src）
        const originalSrc = img.getAttribute('data-original') || img.src;
        
        // 创建遮罩层（类名与 CSS 匹配）
        const overlay = document.createElement('div');
        overlay.className = 'image-zoom-overlay';
        
        // 创建大图
        const largeImg = document.createElement('img');
        largeImg.src = originalSrc;
        largeImg.alt = img.alt || '';
        
        // 创建关闭提示
        const closeHint = document.createElement('div');
        closeHint.className = 'zoom-close-hint';
        closeHint.textContent = '✕ 点击任意位置关闭';
        
        overlay.appendChild(largeImg);
        overlay.appendChild(closeHint);
        document.body.appendChild(overlay);
        
        // 强制重绘后添加 active 类触发动画
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        
        // 点击遮罩层关闭（点击背景关闭）
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeZoom(overlay);
            }
        });
        
        // 点击大图不关闭（让用户可以点击大图本身）
        largeImg.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // ESC 键关闭
        const escHandler = function(e) {
            if (e.key === 'Escape') {
                const activeOverlay = document.querySelector('.image-zoom-overlay.active');
                if (activeOverlay) {
                    closeZoom(activeOverlay);
                }
                document.removeEventListener('keydown', escHandler);
            }
        };
        document.addEventListener('keydown', escHandler);
    }
    
    function closeZoom(overlay) {
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 250);
    }
})();