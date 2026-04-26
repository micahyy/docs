// 图片点击放大功能
(function() {
    'use strict';
    
    // 等待页面加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initZoom);
    } else {
        initZoom();
    }
    
    function initZoom() {
        // 获取所有图片（排除图表情景下的图片）
        const images = document.querySelectorAll('.md-typeset img:not(.mermaid img):not(.highlight img)');
        
        images.forEach(img => {
            // 如果图片已经在链接内，跳过（避免冲突）
            if (img.closest('a')) return;
            
            // 添加点击事件
            img.addEventListener('click', function(e) {
                e.stopPropagation();
                openZoomImage(this);
            });
        });
        
        // 添加 ESC 键关闭功能
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const overlay = document.querySelector('.image-zoom-overlay');
                if (overlay) {
                    closeZoomOverlay(overlay);
                }
            }
        });
    }
    
    function openZoomImage(img) {
        // 获取原图地址（优先使用 data-original，否则使用 src）
        const originalSrc = img.getAttribute('data-original') || img.src;
        
        // 创建遮罩层
        const overlay = document.createElement('div');
        overlay.className = 'image-zoom-overlay';
        
        // 创建大图
        const largeImg = document.createElement('img');
        largeImg.src = originalSrc;
        largeImg.alt = img.alt || '';
        
        // 添加关闭提示
        const closeHint = document.createElement('div');
        closeHint.className = 'zoom-close-hint';
        closeHint.textContent = '✕ 点击任意位置关闭';
        
        overlay.appendChild(largeImg);
        overlay.appendChild(closeHint);
        document.body.appendChild(overlay);
        
        // 强制重绘后添加透明度过渡
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        // 点击关闭
        overlay.addEventListener('click', function() {
            closeZoomOverlay(overlay);
        });
        
        // 阻止图片点击事件冒泡
        largeImg.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    function closeZoomOverlay(overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 250);
    }
})();