import React from 'react';
import './common.less';
import './wechat-image-to-background.less';

export default function App() {
  const onChange = React.useCallback(async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const node = document.getElementById('target') as HTMLTextAreaElement;
    node.value = await transform(e.target.value);
  }, []);
  const copy = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const node = document.getElementById('target') as HTMLTextAreaElement;
    node.select();
    document.execCommand('copy');
    node.setSelectionRange(0, 0);
    node.blur();
  }, []);
  return (
    <>
      <h2>微信公众号文章实现防触碰效果</h2>
      <div>
        参考文章：
        <a
          href="https://mp.weixin.qq.com/s?__biz=MzIyNTgyNzEyNQ==&mid=2247484782&idx=1&sn=66c031895c3b24f695a5048c77c74916&chksm=e8788534df0f0c228144454e649e8609e5ac7e2dd4bd78a3b820dddc2b48e809993b5d1abc33&mpshare=1&scene=1&srcid=0107sG49sXnYZaNla2cs1eKt&sharer_sharetime=1578405801189&sharer_shareid=165df3fe89b08ef85873e284bb6e529c&rd2werd=1#wechat_redirect"
          target="_blank"
        >
          跟苹果学习微信公众号排版
        </a>
      </div>
      <div className="convertor">
        <section className="source">
          <h3>修改前</h3>
          <textarea onChange={onChange} placeholder="把源代码粘贴到这里"></textarea>
        </section>
        <section className="target">
          <div>
            <h3>修改后</h3>
            <div className="action">
              <button type="button" onClick={copy}>
                复制
              </button>
            </div>
          </div>
          <textarea id="target"></textarea>
        </section>
      </div>
    </>
  );
}

async function transform(html: string): Promise<string> {
  const container = document.createElement('div');
  container.innerHTML = html;
  const nodes = Array.from(container.querySelectorAll('img'));
  await Promise.all(
    nodes.map((node: HTMLImageElement) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          const div = document.createElement('div');
          const paddingTop = (img.naturalHeight / img.naturalWidth) * 100;
          div.style.cssText = `padding-top: ${paddingTop}%; background-image: url("${img.src}"); background-size: 100%; background-repeat: no-repeat;`;
          node.parentElement.replaceChild(div, node);
          return resolve();
        };
        img.onerror = reject;
        img.src = node.src || node.getAttribute('src') || node.getAttribute('data-src');
      });
    })
  );
  return container.innerHTML;
}
