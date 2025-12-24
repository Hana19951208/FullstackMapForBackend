
import React from 'react';

interface IconRendererProps {
  icon: string;
  name: string;
  className?: string;
}

const IconRenderer: React.FC<IconRendererProps> = ({ icon, name, className = "" }) => {
  // 更加鲁棒的 URL 检查，处理可能的空格或特殊字符
  const cleanIcon = icon.trim();
  const isUrl = cleanIcon.startsWith('http') || 
                cleanIcon.startsWith('https') || 
                cleanIcon.startsWith('data:image') || 
                /\.(svg|png|jpg|jpeg|webp|ico)(\?.*)?$/i.test(cleanIcon);

  if (isUrl) {
    return (
      <div className={`flex items-center justify-center overflow-hidden flex-shrink-0 bg-zinc-800/50 rounded-lg p-1 ${className}`}>
        <img 
          src={cleanIcon} 
          alt={`${name} logo`} 
          className="w-full h-full object-contain"
          loading="lazy"
          onError={(e) => {
            // 如果图片加载失败，显示一个通用的技术图标或首字母
            const target = e.target as HTMLImageElement;
            target.onerror = null; 
            target.src = `https://api.iconify.design/material-symbols:code-blocks-outline.svg?color=%2371717a`;
          }}
        />
      </div>
    );
  }

  // 如果是 Emoji，直接渲染
  return (
    <span className={`flex items-center justify-center flex-shrink-0 ${className}`}>
      {cleanIcon}
    </span>
  );
};

export default IconRenderer;
