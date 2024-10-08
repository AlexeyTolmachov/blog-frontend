
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';
import axios from 'axios';

const ContentManager = () => {
  const [title, setTitle] = useState('');
  const [sections, setSections] = useState([]);
  const [metaTags, setMetaTags] = useState([]);
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [slug, setSlug] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const loadNewsForEditing = async () => {
    if (!slug) {
      console.error('Введите slug для загрузки новости');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/news/${slug}`);
      const { title, sections, metaTags, content, status } = response.data;
      setTitle(title || '');
      setSections(sections || []);
      setMetaTags(metaTags || []);
      setContent(content || '');
      setStatus(status || '');
      setIsEditing(true);
      setIsCreating(false);
    } catch (error) {
      console.error('Ошибка при загрузке новости:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newsData = {
      title,
      sections,
      metaTags,
      content,
      status,
    };

    try {
      if (isEditing) {
        if (!slug) {
          console.error('Slug обязателен для обновления новости.');
          return;
        }
        await axios.put(`http://localhost:5000/api/news/${slug}`, newsData, {
          headers: {
            Authorization: `Bearer <YOUR_TOKEN_HERE>`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Новость успешно обновлена!');
      } else if (isCreating) {
        await axios.post(`http://localhost:5000/api/news`, newsData, {
          headers: {
            Authorization: `Bearer <YOUR_TOKEN_HERE>`,
            'Content-Type': 'application/json',
          },
        });
        console.log('Новость успешно создана!');
      }

      // Очистка формы после успешного сохранения или создания
      setTitle('');
      setSections([]);
      setMetaTags([]);
      setContent('');
      setStatus('');
      setSlug('');
      setIsEditing(false);
      setIsCreating(false);
    } catch (error) {
      console.error('Ошибка при сохранении новости:', error);
    }
  };

  return (
    <div>
      <h1>{isEditing ? 'Редактировать Новость' : isCreating ? 'Создать Новость' : 'Управление Контентом'}</h1>
      {!isEditing && !isCreating && (
        <div>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Введите slug для загрузки новости"
          />
          <button type="button" onClick={loadNewsForEditing}>
            Загрузить новость
          </button>
          <button type="button" onClick={() => setIsCreating(true)}>
            Создать новость
          </button>
        </div>
      )}
      {(isEditing || isCreating) && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <input
            type="text"
            value={sections.join(', ')}
            onChange={(e) => setSections(e.target.value.split(',').map(s => s.trim()))}
            placeholder="Sections (через запятую)"
          />

          <input
            type="text"
            value={metaTags.join(', ')}
            onChange={(e) => setMetaTags(e.target.value.split(',').map(tag => tag.trim()))}
            placeholder="Meta Tags (через запятую)"
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Выберите статус</option>
            <option value="published">Published</option>
            <option value="created">Created</option>
            <option value="archived">Archived</option>
          </select>

          <Editor
            apiKey="1dbbrgcc7e1m0n0ohpbdvppe9wqa8us1bpzxw2t86atd398q"
            value={content}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
                'emoticons textpattern template imagetools quickbars codesample',
                'fontsize', 'fullscreen', 'emoticons'
              ],
              toolbar: `undo redo | formatselect | bold italic backcolor | 
                        alignleft aligncenter alignright alignjustify | 
                        bullist numlist outdent indent | removeformat | help | 
                        image | fontsize | codesample | emoticons | fullscreen | template`,
              fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
              style_formats: [
                { title: 'Заголовок 1', format: 'h1' },
                { title: 'Заголовок 2', format: 'h2' },
                { title: 'Заголовок 3', format: 'h3' },
                { title: 'Заголовок 4', format: 'h4' },
                { title: 'Заголовок 5', format: 'h5' },
                { title: 'Заголовок 6', format: 'h6' },
                { title: 'Параграф', format: 'p' },
              ],
            }}
            onEditorChange={handleEditorChange}
          />

          <button type="submit">{isEditing ? 'Сохранить изменения' : 'Создать новость'}</button>
        </form>
      )}
    </div>
  );
};

export default ContentManager;
