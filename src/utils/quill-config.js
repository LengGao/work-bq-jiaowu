import { ossUploadImage } from "@/api/educational";
/*富文本编辑图片上传配置*/
const uploadConfig = {
    name: 'image',  // 必填参数 文件的参数名
    accept: 'image/*',  // 可选 可上传的图片格式
};

// toolbar工具栏的工具选项（默认展示全部）
const toolOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['link', 'image']
];
const handlers = {
    image: function image() {
        let self = this;
        let fileInput = this.container.querySelector('input.ql-image[type=file]');
        if (fileInput === null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            // 设置图片参数名
            if (uploadConfig.name) {
                fileInput.setAttribute('name', uploadConfig.name);
            }
            // 可设置上传图片的格式
            fileInput.setAttribute('accept', uploadConfig.accept);
            fileInput.classList.add('ql-image');
            // 监听选择文件
            fileInput.addEventListener('change', async function () {
                // 创建formData
                let formData = new FormData();
                formData.append(uploadConfig.name, fileInput.files[0]);
                const res = await ossUploadImage(formData)
                if (res.code === 0) {
                    let length = self.quill.getSelection(true).index;
                    //这里很重要，你图片上传成功后，img的src需要在这里添加，res.path就是你服务器返回的图片链接。            
                    self.quill.insertEmbed(length, 'image', res.data?.data?.url || '');
                    self.quill.setSelection(length + 1)
                }
            });
            this.container.appendChild(fileInput);
        }
        fileInput.click();
    }
};

export default {
    placeholder: '',
    theme: 'snow',  // 主题
    modules: {
        toolbar: {
            container: toolOptions,  // 工具栏选项
            handlers: handlers  // 事件重写
        }
    }
};