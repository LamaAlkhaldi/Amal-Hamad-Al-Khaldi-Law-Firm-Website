document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeBtn = document.querySelector('.close-btn');

    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.law-service-card');
            
            if (card) {
                const title = card.querySelector('.service-header h3').innerText;
                const detailsHtml = card.querySelector('.service-details').innerHTML;

                modalTitle.innerText = title;
                modalBody.innerHTML = detailsHtml;
                modal.style.display = 'flex';
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

//     بيانات خدمات التوثيق   
const notarizationData = [
  {
    category: 'agency',
    title: 'إصدار وفسخ الوكالات الشرعية',
    details: [
      'إصدار الوكالات الشرعية',
      'توثيق فسخ الوكالات الشرعية',
      'أصالة عن نفسه / وكيل بموجب وكالة / ولي على قاصر',
      'صاحب مكتب / ناظر وقف / حارس قضائي'
    ]
  },
  {
    category: 'realestate',
    title: 'الإفراغات والرهون العقارية',
    details: [
      'توثيق الإفراغات العقارية',
      'توثيق الرهون العقارية وفك الرهن',
      'تصحيح الرهن',
      'توثيق إفراغ ورهن العقارات (في إجراء واحد)',
      'معاملات البيع والهبة والرهن والسعي'
    ]
  },
  {
    category: 'financial',
    title: 'الإقرارات والالتزامات المالية',
    details: [
      'توثيق الإقرارات بسداد الديون',
      'توثيق الإقرارات باستلام المبالغ المالية',
      'دفعة عقد استصناع / دفعة عقد مقاولة',
      'تسوية قضية / أرباح / مخالصة مشروع / أتعاب خدمة / عربون'
    ]
  },
  {
    category: 'corporate',
    title: 'توثيق الشركات والمؤسسات',
    details: [
      'توثيق عقود تأسيس الشركات ذات المسؤولية المحدودة',
      'توثيق قرارات الشركاء وتعديل العقود',
      'تمثيل الشركات وصاحب المؤسسة',
      'مصفي شركة / حارس قضائي'
    ]
  }
];

// البحث 
function renderServices(data) {
  const grid = document.getElementById('servicesGrid');
  grid.innerHTML = '';

  if (data.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #777;">لا توجد نتائج مطابقة للبحث.</p>';
    return;
  }

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'law-service-card';
    card.setAttribute('data-category', item.category);

    let listHTML = '';
    item.details.forEach(detail => {
      listHTML += `<li>${detail}</li>`;
    });

    card.innerHTML = `
      <h3>${item.title}</h3>
      <ul>${listHTML}</ul>
    `;
    grid.appendChild(card);
  });
}

//  الفلترة على الأزرار
function filterServices(category) {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  document.getElementById('notarySearch').value = '';

  if (category === 'all') {
    renderServices(notarizationData);
  } else {
    const filtered = notarizationData.filter(item => item.category === category);
    renderServices(filtered);
  }
}

// بحث سريع 
function searchServices() {
  const query = document.getElementById('notarySearch').value.toLowerCase();
  
  const filtered = notarizationData.filter(item => {
    const matchTitle = item.title.toLowerCase().includes(query);
    const matchDetails = item.details.some(d => d.toLowerCase().includes(query));
    return matchTitle || matchDetails;
  });

  renderServices(filtered);
}

// تشغيل عرض خدمات التوثيق أول ما يشتغل الموقع 
document.addEventListener('DOMContentLoaded', () => {
  renderServices(notarizationData);
});
