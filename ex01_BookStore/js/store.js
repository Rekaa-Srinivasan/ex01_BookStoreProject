function show_books() {
    const chosen_author = document.querySelector(".authors").value;
    const all_books = document.querySelectorAll(".book");
    for(let book of all_books) {
        if(book.children[0].children[1].textContent === chosen_author || chosen_author === "All"){
            book.style.display = "block";
        }else {
            book.style.display = "none";
        }
    }
}

$(".fas").on("click", () => {
    $(".menus").toggle();
})

async function getBooks() {
    try {
        const books = await databases.listDocuments('6617abe7972b1276173d', '6617ac1d17a701221af6');
        const content = await books.documents;
        console.log("----------------------------------------------")
        console.log(content);

        jQuery.map(content, function(book) {
            const {bookUrl, imageUrl, price, description, title, authorName, bookId} = book;
                        
            $('.books_list').append(`<article class="book pb-4 flex flex-col items-center justify-center">
                <div class="book_container p-book-container bg-secondary-bg-color w-72 flex items-center justify-center pb-4 px-4">
                    <a class="read_more" href="`+bookUrl+`?bookId=`+bookId+`">
                        <p class="book-id hidden">`+authorName+`</p>
                        <img class="book_image max-w-52" src="`+imageUrl+`" alt="The Dark Light book">
                    </a>
                    <p class="author_name hidden">`+authorName+`</p>
                </div>
                <div class="book_info text-left py-4 px-3 w-72">
                    <h3 class="book_title font-cardo inline-block font-bold text-l text-primary-color leading-7 pr-6">`+title+`</h3>
                    <p class="book_price font-inter inline-block font-bold text-quaternary-color leading-7">$`+price+`</p>
                    <p class="book_description font-inter font-normal text-left text-sm text-secondary-font-color leading-7">`+description+`</p>
                    <i class="fa-solid fa-circle fa-2xs text-quaternary-color"></i><p class="book_type font-inter inline-block font-bold text-sm text-primary-color py-3 pl-2">Printed Books</p>
                    <button class="book_order_button font-cardo block font-bold text-m text-primary-color border-quaternary-color border-solid border-2 px-8 py-2">Order Today</button>
                </div>
            </article>`);

        });
    }catch {
        err => console.log(err);
    }
}
getBooks();