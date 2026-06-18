// 一日一言组件 - 显示在头像下方
document.addEventListener('DOMContentLoaded', function() {
  // 创建一言组件的DOM结构
  function createQuoteWidget() {
    const container = document.createElement('div');
    container.id = 'daily-quote';
    container.className = 'card-widget';
    container.innerHTML = `
      <div class="card-content">
        <div class="item-headline">
          <i class="fas fa-quote-left"></i>
          <span>一日一言</span>
        </div>
        <div id="quote-content" class="quote-text">
          <span class="loading-text">加载中...</span>
        </div>
      </div>
    `;

    // 插入到头像卡片后面（使用更通用的选择器）
    const asideContent = document.getElementById('aside-content');
    if (asideContent) {
      const authorCard = asideContent.querySelector('.card-widget.card-info');
      if (authorCard && authorCard.nextSibling) {
        asideContent.insertBefore(container, authorCard.nextSibling);
      } else if (authorCard) {
        authorCard.after(container);
      } else {
        asideContent.prepend(container);
      }
    }
  }

  // 获取一言
  function fetchQuote() {
    const quoteElement = document.getElementById('quote-content');
    if (!quoteElement) return;

    // 使用 hitokoto.cn API
    fetch('https://v1.hitokoto.cn/')
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        if (data.hitokoto) {
          quoteElement.innerHTML = `
            <div class="quote-text-content">${data.hitokoto}</div>
            <div class="quote-source">—— ${data.from || '未知'}</div>
          `;
        }
      })
      .catch(error => {
        console.error('获取一言失败:', error);
        quoteElement.innerHTML = `
          <div class="quote-text-content">人生海海，山山而川。</div>
          <div class="quote-source">—— 木心</div>
        `;
      });
  }

  // 初始化
  createQuoteWidget();
  fetchQuote();
});
