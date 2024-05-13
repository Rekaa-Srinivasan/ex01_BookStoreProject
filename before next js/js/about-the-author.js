$(".store_logo").on("click", () => {
    $(".menus").toggle();
});

const {Client, Databases, Query} = Appwrite;
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
async function getAuthorInformation() {

    try {
        const author_id = GetParameterValues('authorId');

        const bookResponse = await databases.listDocuments('6617abe7972b1276173d', '6618fb6b58afdc4cbd1d', [ Query.equal('authorId', [author_id]) ]);
        const content = await bookResponse.documents;
        console.log(content);

        jQuery.map(content, (authorInformation) => {
            const { country, language, genre, authorImageUrl, publicationDate, 
                authorName, aboutAuthor, authorStory, authorAwards, authorId, 
                bookID, authorProfile, sponsors } = authorInformation;

            const awardsContent = JSON.parse(authorAwards);
            console.log(awardsContent);

            const sponsorsContent = JSON.parse(sponsors);
            console.log(sponsorsContent);

            $(".author_information").append(`
                <img class="author_picture" src="`+authorImageUrl+`" alt="Author's image">
                <div class="author_info">
                    <div class="author_biography">
                        <table>
                            <tr>
                            <td>Country :</td>
                            <td class="author_details">`+country+`</td>
                            </tr>
                            <tr>
                            <td>Language :</td>
                            <td class="author_details">`+language+`</td>
                            </tr>
                            <tr>
                            <td>Genre :</td>
                            <td class="author_details">`+genre+`</td>
                            </tr>
                            <tr>
                            <td>Publication Date :</td>
                            <td class="author_details">`+publicationDate+`</td>
                            </tr>
                            <tr>
                            <td>Share us on :</td>
                            <td class="author_details"><a href=""><i class="fa-brands fa-facebook-f"></i></a><a href=""><i class="fa-brands fa-twitter"></i></a><a href=""><i class="fa-brands fa-linkedin-in"></i></a></td>
                            </tr>
                        </table>
                    </div>
                    <div class="author_additional_info">
                        <h1 class="author_name">About `+authorName+`</h1>
                        <p class="about_author">`+aboutAuthor+`</p>
                        <button class="contact_author">Contact now</button>
                    </div>
                </div>
            `);

            $(".author_and_his_story").append(`
                <div class="author_story">
                    <h3 class="author_story_title">My Story</h3>
                    <p class="author_story_description">`+authorStory+`</p>
                    <div class="authors_awards"></div>
                </div>
                <img class="author_profile" src="`+authorProfile+`" alt="Author's Profile">
            `);

            jQuery.map(awardsContent, (awards) => {
                console.log("##########################");
                const { awardNumber, awardTitle, awardDescription } = awards;
                console.log(awardTitle);
                console.log(awardDescription);
                $(".authors_awards").append(`
                    <div class="awards">
                        <div class="award">`+awardNumber+`</div>
                        <div class="awards_info">
                            <h3 class="award_name">`+awardTitle+`</h3>
                            <p class="award_description">`+awardDescription+`</p>
                        </div>
                    </div>
                `)
            });

            console.log(bookID);
            jQuery.map(bookID, (book) => {
                const {bookUrl, imageUrl, title, description, paperback, timeTakenToFinish} = book;
                $(".books").append(`
                    <article class="book_conatiner">
                    <a href="`+bookUrl+`"><img class="book_cover" src="`+imageUrl+`" alt="`+title+` book"></a>
                        <div class="book_info">
                            <h4 class="book_title">`+title+`</h4>
                            <p class="book_description">`+description+`</p>
                            <div class="book_page_details">
                                <div>
                                    <p class="about_book"><i class="fa-solid fa-circle fa-2xs" style="color: #FFCA42; display: inline;"></i>Pages</p>
                                    <p class="about_book_value">`+paperback+` pages</p>
                                </div>
                                <div>
                                    <p class="about_book"><i class="fa-solid fa-circle fa-2xs" style="color: #FFCA42; display: inline;"></i>Length</p>
                                    <p class="about_book_value">`+timeTakenToFinish+` Hours</p>
                                </div>
                            </div>
                            <button class="book_order_button">Order Today</button>
                        </div>
                    </article>
                `);
            });

            jQuery.map(sponsorsContent, (sponsor) => {
                const { sponsorLogo, sponsorName, sponsorDescription } = sponsor;
                $(".sponsors_list").append(`
                    <article class="sponsor">
                        <img class="sponsor_logo" src="`+sponsorLogo+`" alt="Amazen Corps Logo">
                        <h4 class="sponsor_name">`+sponsorName+`</h4>
                        <p class="sponsor_description">`+sponsorDescription+`</p>
                    </article>
                `)
            })

        })
    }catch {
        err => console.log(err);
    }

}
getAuthorInformation();