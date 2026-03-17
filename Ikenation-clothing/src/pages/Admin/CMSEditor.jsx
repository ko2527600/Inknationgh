import { useState } from 'react';
import { useCMSStore } from '../../store/cmsData';
import AdminLayout from './AdminLayout';
import { Save, Plus, Trash2 } from 'lucide-react';

export default function CMSEditor({ pageName, pageTitle }) {
  const { cmsData } = useCMSStore();
  const pageData = cmsData[pageName];
  const [saved, setSaved] = useState(false);

  console.log('CMSEditor - pageName:', pageName, 'pageData:', pageData, 'cmsData keys:', Object.keys(cmsData));

  if (!pageData) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-red-600 font-semibold">Page not found: {pageName}</p>
          <p className="text-gray-600 text-sm mt-2">Available pages: {Object.keys(cmsData).join(', ')}</p>
        </div>
      </AdminLayout>
    );
  }

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{pageTitle}</h1>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <Save size={20} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <CMSPageContent pageName={pageName} pageData={pageData} />
        </div>
      </div>
    </AdminLayout>
  );
}

function CMSPageContent({ pageName, pageData }) {
  // Render different editors based on page type
  switch (pageName) {
    case 'home':
      return <HomeEditor pageData={pageData} pageName={pageName} />;
    case 'about':
      return <AboutEditor pageData={pageData} pageName={pageName} />;
    case 'contact':
      return <ContactEditor pageData={pageData} pageName={pageName} />;
    case 'faq':
      return <FAQEditor pageData={pageData} pageName={pageName} />;
    case 'blog':
      return <BlogEditor pageData={pageData} pageName={pageName} />;
    case 'privacy':
    case 'legal':
      return <LegalEditor pageData={pageData} pageName={pageName} />;
    case 'sizeGuide':
      return <SizeGuideEditor pageData={pageData} pageName={pageName} />;
    case 'collections':
      return <CollectionsEditor pageData={pageData} pageName={pageName} />;
    case 'shop':
      return <ShopEditor pageData={pageData} pageName={pageName} />;
    default:
      return <GenericEditor pageData={pageData} pageName={pageName} />;
  }
}

// Generic Editor for simple pages
function GenericEditor({ pageData, pageName }) {
  const { updateField } = useCMSStore();

  return (
    <div className="space-y-6">
      {Object.entries(pageData).map(([key, value]) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
            {key.replace(/([A-Z])/g, ' $1')}
          </label>
          {typeof value === 'string' ? (
            value.length > 100 ? (
              <textarea
                value={value}
                onChange={(e) => updateField(pageName, key, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="6"
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => updateField(pageName, key, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            )
          ) : null}
        </div>
      ))}
    </div>
  );
}

// Home Page Editor
function HomeEditor({ pageData, pageName }) {
  const { updateField, updateItem, addItem, removeItem } = useCMSStore();
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageUpload = (e, slideIndex) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateItem(pageName, 'heroSlides', slideIndex, {
          ...pageData.heroSlides[slideIndex],
          image: reader.result,
        });
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Debug: Check if heroSlides exists
  if (!pageData.heroSlides || pageData.heroSlides.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-700 font-semibold mb-4">No hero slides yet. Add one to get started.</p>
        <button
          onClick={() => {
            const newSlide = {
              id: Date.now(),
              title: 'New Slide',
              subtitle: 'Add your subtitle',
              image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&h=600&fit=crop',
              cta: 'Shop Now',
            };
            addItem(pageName, 'heroSlides', newSlide);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add First Slide
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Slides Editor */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Hero Slides ({pageData.heroSlides.length})</h2>
        <div className="space-y-6">
          {pageData.heroSlides.map((slide, idx) => (
            <div key={idx} className="p-6 border border-gray-300 rounded-lg bg-gray-50 relative">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Slide {idx + 1}</h3>
                <button
                  onClick={() => removeItem(pageName, 'heroSlides', idx)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Remove Slide
                </button>
              </div>
              
              {/* Image URL */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="text"
                  value={slide.image}
                  onChange={(e) => updateItem(pageName, 'heroSlides', idx, { ...slide, image: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Or Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, idx)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Image Preview */}
              {(previewImage || slide.image) && (
                <div className="mb-4">
                  <img
                    src={previewImage || slide.image}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={slide.title}
                  onChange={(e) => updateItem(pageName, 'heroSlides', idx, { ...slide, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Subtitle */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <input
                  type="text"
                  value={slide.subtitle}
                  onChange={(e) => updateItem(pageName, 'heroSlides', idx, { ...slide, subtitle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* CTA Button Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                <input
                  type="text"
                  value={slide.cta}
                  onChange={(e) => updateItem(pageName, 'heroSlides', idx, { ...slide, cta: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              const newSlide = {
                id: Date.now(),
                title: 'New Slide',
                subtitle: 'Add your subtitle',
                image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=1200&h=600&fit=crop',
                cta: 'Shop Now',
              };
              addItem(pageName, 'heroSlides', newSlide);
            }}
            className="w-full py-3 mt-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 font-medium hover:border-gray-400 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            + Add New Slide
          </button>
        </div>
      </div>

      {/* Trust Bar */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Trust Bar</h2>
        <div className="space-y-4">
          {pageData.trustBar.map((item, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Title</label>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => {
                    const updated = { ...item, text: e.target.value };
                    const newTrustBar = [...pageData.trustBar];
                    newTrustBar[idx] = updated;
                    updateField(pageName, 'trustBar', newTrustBar);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Description</label>
                <input
                  type="text"
                  value={item.description || ''}
                  onChange={(e) => {
                    const updated = { ...item, description: e.target.value };
                    const newTrustBar = [...pageData.trustBar];
                    newTrustBar[idx] = updated;
                    updateField(pageName, 'trustBar', newTrustBar);
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// About Page Editor
function AboutEditor({ pageData, pageName }) {
  const { updateField, addItem, removeItem, updateItem } = useCMSStore();

  const handleImageUpload = (e, memberIndex) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateItem(pageName, 'team', memberIndex, {
          ...pageData.team[memberIndex],
          image: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={pageData.title}
          onChange={(e) => updateField(pageName, 'title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Brand Story</label>
        <textarea
          value={pageData.story}
          onChange={(e) => updateField(pageName, 'story', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="6"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Mission</label>
        <textarea
          value={pageData.mission}
          onChange={(e) => updateField(pageName, 'mission', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
      </div>

      {/* Team Members */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Meet Our Team</h3>
          <button
            onClick={() => addItem(pageName, 'team', { id: Date.now(), name: 'New Member', role: 'Role', image: '', bio: 'Short bio...' })}
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm"
          >
            <Plus size={16} /> Add Team Member
          </button>
        </div>

        <div className="space-y-4">
          {(pageData.team || []).map((member, idx) => (
            <div key={member.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateItem(pageName, 'team', idx, { ...member, name: e.target.value })}
                      placeholder="Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => updateItem(pageName, 'team', idx, { ...member, role: e.target.value })}
                      placeholder="Role"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, idx)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                  {member.image && (
                    <img src={member.image} alt="Preview" className="h-16 w-16 object-cover rounded mt-2" />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Bio</label>
                  <textarea
                    value={member.bio}
                    onChange={(e) => updateItem(pageName, 'team', idx, { ...member, bio: e.target.value })}
                    placeholder="Short bio"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="2"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => removeItem(pageName, 'team', idx)}
                    className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
                  >
                    <Trash2 size={16} /> Delete Member
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Contact Page Editor
function ContactEditor({ pageData, pageName }) {
  const { updateField } = useCMSStore();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={pageData.title}
          onChange={(e) => updateField(pageName, 'title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number</label>
        <input
          type="text"
          value={pageData.whatsapp}
          onChange={(e) => updateField(pageName, 'whatsapp', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={pageData.email}
          onChange={(e) => updateField(pageName, 'email', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <input
          type="text"
          value={pageData.location}
          onChange={(e) => updateField(pageName, 'location', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}

// FAQ Editor
function FAQEditor({ pageData, pageName }) {
  const { updateField, addItem, removeItem, updateItem } = useCMSStore();

  // Fallback if pageData is undefined
  const data = pageData || { title: '', items: [] };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={data.title || ''}
          onChange={(e) => updateField(pageName, 'title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">FAQ Items</h3>
          <button
            onClick={() => addItem(pageName, 'items', { question: 'New Question?', answer: 'Answer here...' })}
            className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm"
          >
            <Plus size={16} /> Add FAQ
          </button>
        </div>

        <div className="space-y-4">
          {(data.items || []).map((item, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg">
              <div className="space-y-3">
                <input
                  type="text"
                  value={item.question}
                  onChange={(e) => updateItem(pageName, 'items', idx, { ...item, question: e.target.value })}
                  placeholder="Question"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  value={item.answer}
                  onChange={(e) => updateItem(pageName, 'items', idx, { ...item, answer: e.target.value })}
                  placeholder="Answer"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
                <button
                  onClick={() => removeItem(pageName, 'items', idx)}
                  className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Blog Editor
function BlogEditor({ pageData, pageName }) {
  const { addItem, removeItem, updateItem } = useCMSStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Blog Posts</h3>
        <button
          onClick={() => addItem(pageName, 'posts', { id: Date.now(), title: 'New Post', excerpt: '', content: '', image: '', date: new Date().toISOString().split('T')[0], author: 'Isaac' })}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm"
        >
          <Plus size={16} /> Add Post
        </button>
      </div>

      <div className="space-y-4">
        {pageData.posts.map((post, idx) => (
          <div key={post.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="space-y-3">
              <input
                type="text"
                value={post.title}
                onChange={(e) => updateItem(pageName, 'posts', idx, { ...post, title: e.target.value })}
                placeholder="Post Title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={post.excerpt}
                onChange={(e) => updateItem(pageName, 'posts', idx, { ...post, excerpt: e.target.value })}
                placeholder="Excerpt"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
              <textarea
                value={post.content}
                onChange={(e) => updateItem(pageName, 'posts', idx, { ...post, content: e.target.value })}
                placeholder="Full Content"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
              <button
                onClick={() => removeItem(pageName, 'posts', idx)}
                className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Legal Pages Editor
function LegalEditor({ pageData, pageName }) {
  const { updateField, updateItem } = useCMSStore();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={pageData.title}
          onChange={(e) => updateField(pageName, 'title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Sections</h3>
        <div className="space-y-4">
          {pageData.sections && pageData.sections.map((section, idx) => (
            <div key={idx} className="p-4 border border-gray-200 rounded-lg">
              <div className="space-y-3">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateItem(pageName, 'sections', idx, { ...section, title: e.target.value })}
                  placeholder="Section Title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold"
                />
                <textarea
                  value={section.content}
                  onChange={(e) => updateItem(pageName, 'sections', idx, { ...section, content: e.target.value })}
                  placeholder="Section Content (Markdown)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  rows="4"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Content (Markdown - for reference)</label>
        <textarea
          value={pageData.content}
          onChange={(e) => updateField(pageName, 'content', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
          rows="8"
        />
      </div>
    </div>
  );
}

// Size Guide Editor
function SizeGuideEditor({ pageData, pageName }) {
  const { updateField } = useCMSStore();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={pageData.title}
          onChange={(e) => updateField(pageName, 'title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={pageData.description}
          onChange={(e) => updateField(pageName, 'description', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>
    </div>
  );
}

// Collections Editor
function CollectionsEditor({ pageData, pageName }) {
  const { updateField, addItem, removeItem, updateItem } = useCMSStore();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={pageData.title}
          onChange={(e) => updateField(pageName, 'title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Collections</h3>
        <button
          onClick={() => addItem(pageName, 'items', { id: Date.now(), name: 'New Collection', description: '', image: '' })}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 text-sm"
        >
          <Plus size={16} /> Add Collection
        </button>
      </div>

      <div className="space-y-4">
        {pageData.items.map((item, idx) => (
          <div key={item.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="space-y-3">
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(pageName, 'items', idx, { ...item, name: e.target.value })}
                placeholder="Collection Name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={item.description}
                onChange={(e) => updateItem(pageName, 'items', idx, { ...item, description: e.target.value })}
                placeholder="Description"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                rows="2"
              />
              <button
                onClick={() => removeItem(pageName, 'items', idx)}
                className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 text-sm"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Shop Editor
function ShopEditor({ pageData, pageName }) {
  const { updateField } = useCMSStore();

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={pageData.title}
          onChange={(e) => updateField(pageName, 'title', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <textarea
          value={pageData.description}
          onChange={(e) => updateField(pageName, 'description', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          rows="3"
        />
      </div>
    </div>
  );
}
