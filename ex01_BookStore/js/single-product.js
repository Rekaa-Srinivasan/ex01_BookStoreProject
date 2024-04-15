$(".fas").on("click", () => {
    $(".menus").toggle();
})

const { Client, Databases, Query } = Appwrite;
const client = new Client();
const databases = new Databases(client);

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('6617a891be2612bf76c1');

function GetParameterValues(param) {  
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');  
    for (var i = 0; i < url.length; i++) {  
        var urlparam = url[i].split('=');  
        if (urlparam[0] == param) {  
            return urlparam[1];  
        }  
    }  
}

async function getBookInformation() {
    const book_id = GetParameterValues("bookId");
    console.log(book_id);
    const bookResponse = await databases.listDocuments('6617abe7972b1276173d', '6617ac1d17a701221af6', [ Query.equal('bookId', [book_id]) ]);
    const content = await bookResponse.documents;
    console.log(content);

    jQuery.map(content, (bookData) => {
        const {imageUrl, title, price, description, publisher, language, 
            paperback, isbnNumber, dimension, availableBookCount, 
            discounInfo, whoBookForInfo, authorID} = bookData;
            const {authorId} = authorID;
            console.log(authorId);

        $('.product_container').append(`
            <div class="product_image_conatainer bg-secondary-bg-color flex-grow flex-shrink-0 basis-2/5 flex justify-center py-8">
                <img class="product_image w-3/4" src="`+imageUrl+`" alt="Atomic One's Book">
            </div>
            <div class="product_information text-left flex-grow-0 flex-shrink basis-3/5 pl-6 md:pl-10 mt-12">
                <h3 class="product_title font-cardo font-bold text-xl text-primary-color mt-0 mb-1">`+title+`</h3>
                <h4 class="product_price font-inter font-extrabold mt-0 text-m text-quaternary-color">$`+price+`.00 USD</h4>
                <p class="product_description font-inter font-normal text-sm leading-8 text-secondary-font-color py-4 pr-5">`+description+`</p>
                <div class="product_details font-inter font-normal text-sm leading-8 text-secondary-font-color">
                    <table class="max-w-table">
                        <tr>
                        <td class="p-1">Publisher </td>
                        <td class="p-1">:</td>
                        <td class=" product_detailed_info pl-5">`+publisher+`</td>
                        </tr>
                        <tr>
                        <td class="p-1">Language</td>
                        <td class="p-1">:</td>
                        <td class=" product_detailed_info pl-5">`+language+`</td>
                        </tr>
                        <tr>
                        <td class="p-1">Paperback</td>
                        <td class="p-1">:</td>
                        <td class=" product_detailed_info pl-5">`+paperback+`</td>
                        </tr>
                        <tr>
                        <td class="p-1">ISBN-10</td>
                        <td class="p-1">:</td>
                        <td class=" product_detailed_info pl-5">`+isbnNumber+`</td>
                        </tr>
                        <tr>
                        <td class="p-1">Dimensions</td>
                        <td class="p-1">:</td>
                        <td class=" product_detailed_info pl-5">`+dimension+`</td>
                        </tr>
                    </table>
                </div>
                <div class="add_product mt-4 flex">
                    <div class="number_of_products basis-1/12 font-inter border-2 border-solid border-quaternary-color text-secondary-font-color inline-block px-9 py-3 m-0 mr-3 font-medium">`+availableBookCount+`</div>
                    <button class="add_product_to_cart_button basis-3/5 font-cardo border-2 border-solid border-quaternary-color bg-quaternary-color text-primary-color inline-block font-bold m-0"><i class="fas fa-regular fa-cart-shopping pr-0.5"></i>Add to Cart</button>
                </div>
            </div>
        `)
        
        $('.about_product').append(`
            <div class="product_information_buttons flex flex-wrap gap-4 justify-center">
                <button class="product_description_button bg-primary-color text-tertiary-bg-color font-cardo font-bold border-2 border-solid border-primary-color px-7 py-3 mt-5">PRODUCT DESCRIPTION</button>
                <a href="./about-the author/about-the-author.html?authorId=`+authorId+`"><button class="additional_info_button bg-secondary-bg-color text-primary-color font-cardo font-bold border-2 border-solid border-secondary-bg-color px-7 py-3 mt-5">AUTHOR INFORMATION</button></a>
            </div>
            <div class="product_additional_info flex flex-wrap gap-4 justify-center pt-8">
                <div class="discount_info basis-2/5 flex-grow pl-2 sm:px-3">
                    <h3 class="discount_info_title text-primary-color font-cardo font-bold ">Do you offer discounts for education?</h3>
                    <p class="discount_info_description text-secondary-font-color font-inter font-normal text-sm leading-7">`+discounInfo+`</p>
                </div>
                <div class="who_the_book_for lg:pr-2 sm:px-3 basis-2/5 flex-grow">
                    <h3 class="book_for_title text-primary-color font-cardo font-bold ">Is this book for me?</h3>
                    <p class="book_for_description text-secondary-font-color font-inter font-normal text-sm leading-7">`+whoBookForInfo+`</p>
                </div>
            </div>
        `)
    })

}
getBookInformation();