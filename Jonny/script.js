// Add click event to all products
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        let productName = product.querySelector('h3').textContent;
        alert(`You selected ${productName}`);

        // Remove highlight from all products
        document.querySelectorAll('.product').forEach(p => p.classList.remove('selected'));

        // Highlight the clicked product
        product.classList.add('selected');
    });
});
