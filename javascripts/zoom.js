// 统一处理链接和图片
(function() {
    'use strict';
    
    // 关闭放大视图
    function closeZoom(overlay) {
        if (!overlay) return;
        overlay.classList.remove('active');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 250);
    }
    
    // 打开图片放大
    function openZoom(img) {
        const existingOverlay = document.querySelector('.image-zoom-overlay');
        if (existingOverlay) {
            closeZoom(existingOverlay);
            return;
        }
        
        // 获取原图（优先使用链接的 href）
        const parentLink = img.closest('a');
        const originalSrc = parentLink ? parentLink.href : (img.getAttribute('data-original') || img.src);
        
        const overlay = document.createElement('div');
        overlay.className = 'image-zoom-overlay';
        
        const largeImg = document.createElement('img');
        largeImg.src = originalSrc;
        largeImg.alt = img.alt || '';
        
        const closeHint = document.createElement('div');
        closeHint.className = 'zoom-close-hint';
        closeHint.textContent = '✕ 点击任意位置关闭';
        
        overlay.appendChild(largeImg);
        overlay.appendChild(closeHint);
        document.body.appendChild(overlay);
        
        setTimeout(() => {
            overlay.classList.add('active');
        }, 10);
        
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                closeZoom(overlay);
            }
        });
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        // 1. 处理所有链接：外部链接在新窗口打开，内部链接和图片链接在当前页处理
        const allLinks = document.querySelectorAll('a');
        
        allLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (!href) return;
            
            // 检查是否是图片链接（href 以图片格式结尾）
            const isImageLink = /\.(jpg|jpeg|png|gif|webp|svg|bmp)(\?.*)?$/i.test(href);
            
            // 检查是否是外部链接
            const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
            
            if (isImageLink) {
                // 图片链接：阻止跳转，改为放大功能
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const img = this.querySelector('img');
                    if (img) {
                        openZoom(img);
                    }
                });
            } else if (isExternal) {
                // 外部链接：新窗口打开，增加安全性
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
            // 内部链接：保持默认行为（当前页打开）
        });
        
        // 2. 处理没有链接包裹的普通图片
        const standaloneImages = document.querySelectorAll('article img:not(a img), .md-content img:not(a img)');
        standaloneImages.forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', function() {
                openZoom(this);
            });
        });
        
        // 3. ESC 全局关闭
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeOverlay = document.querySelector('.image-zoom-overlay.active');
                if (activeOverlay) {
                    closeZoom(activeOverlay);
                }
            }
        });
    });
})();