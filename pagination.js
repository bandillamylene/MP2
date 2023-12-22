// Sample product data
const products = Array.from({ length: 25 }, (_, index) => `Product ${index + 1}`);
const productsPerPage = 5;
let currentPage = 1;

function displayProducts() {
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Render your product items based on currentProducts
}

function updatePagination() {
  const totalPages = Math.ceil(products.length / productsPerPage);
  document.getElementById('currentPage').textContent = `Page ${currentPage} of ${totalPages}`;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
    updatePagination();
  }
}

function nextPage() {
  const totalPages = Math.ceil(products.length / productsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayProducts();
    updatePagination();
  }
}

displayProducts();
updatePagination();