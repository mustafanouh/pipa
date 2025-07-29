async function getAllProducts(){
    try{
        const response = await fetch('https://fakestoreapi.com/products');
        const allProducts = await response.json();
        
        const container =document.getElementById('product-data');
        allProducts.forEach(product => {
            const card =document.createElement('div');
            card.className= 'col-md-4 mb-4';
            card.innerHTML=`
            <div class="card h-100">
                 <img src="${product.image}" class="card-img-top" style="height: 350px; object-fit: cover;" alt="${product.title}">
           <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
         <button class="btn btn-primary w-100 mt-2" onclick="alert('تمت إضافة المنتج إلى السلة')">🛒 إضافة إلى السلة</button>
         </div>
       <div class="card-footer">
      <small class="text-muted">price: ${product.price}$</small>
      </div>
      </div>`;
      container.appendChild(card);
        });
    } catch(error){
        console.error('An error occurred while fetching products',error)
    }
    
}
getAllProducts();
//POST code
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const container = document.getElementById('productsContainer');

  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'col-md-4 mb-4';
    card.innerHTML = `
      <div class="card h-100">
        <img src="${product.image}" class="card-img-top" style="height: 350px; object-fit: cover;" alt="${product.title}">
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
          <button class="btn btn-success w-100 mt-2" onclick="alert('تمت إضافة المنتج إلى السلة')">🛒 شراء</button>
        </div>
        <div class="card-footer">
          <small class="text-muted">السعر: ${product.price} $</small>
        </div>
      </div>
    `;
    container.prepend(card);
  }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const title = document.getElementById('productName').value.trim();
    const price = parseFloat(document.getElementById('productPrice').value);
    const description = document.getElementById('productDescription').value.trim();
    const category = document.getElementById('productCategory').value;
    const image = document.getElementById('productImage').value.trim();

    const productData = { title, price, description, category, image };

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (!response.ok) throw new Error('خطأ في الإرسال');

      const data = await response.json();
      createProductCard(data);
      form.reset();
      alert('تمت إضافة المنتج');
    } catch (error) {
      console.error('فشل الإرسال:', error);
      alert('حدث خطأ، حاول مجددًا.');
    }
  });
});

