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

async function getBlogsInformation() {
    try {
        const blog_id = GetParameterValues("blogId");
        const blogInfo = await databases.listDocuments('6617abe7972b1276173d', '661aada1b27d86cef8a3', [ Query.equal('blogId', [blog_id]) ]);
        const content = await blogInfo.documents;

        jQuery.map(content, (blog) => {
            const { blogImageUrl, blogDescription, 
                blogDate, primaryContentTitle, primaryContentDescription, 
                primaryPoints, blogLogo, blogQuote, secondaryContentTitle, 
                secondaryContentDescription, secondaryPoints} = blog;

                const primaryPts = JSON.parse(primaryPoints);
                const secondaryPts = JSON.parse(secondaryPoints);

            $(".single_blog_container").append(`
                <article class="blog_main_content">
                    <img class="blog_picture" src="`+blogImageUrl+`" alt="A girl reading a book">
                    <div class="blog_info">
                        <h3 class="blog_date">`+blogDate+` / Classics</h3>
                        <p class="blog_description">`+blogDescription+blogDescription+blogDescription+blogDescription+`</p>
                    </div>
                </article>
                <section class="blog_sub_content">
                    <h2 class="blog_sub_content_title">`+primaryContentTitle+`</h2>
                    <p class="blog_sub_content_description">`+primaryContentDescription+`</p>
                    <ul  type="disc" class="blog_sub_content_points"></ul>
                </section>
            `);
            
            console.log(primaryPts);
            jQuery.map(primaryPts, (point) => {
                $(".blog_sub_content_points").append(`
                    <li class="point" id="sub_content_point_1">`+point+`</li>
                `);
            });

            $(".single_blog_container").append(`
                <div class="blog_quotes">
                    <img class="blog_logo" src="`+blogLogo+`" alt="bookmark icon">
                    <p class="quote">`+blogQuote+`</p>
                </div>
                <section class="blog_sub_content">
                    <h2 class="blog_sub_content_title">`+secondaryContentTitle+`</h2>
                    <p class="blog_sub_content_description">`+secondaryContentDescription+`</p>
                    <ol  type="1" class="blog_sub_content_points">
                        
                    </ol>
                </section>
            `);

            jQuery.map(secondaryPts, (point) => {
                $("ol").append(`
                    <li class="point" id="sub_content_point_1">`+point+`</li>
                `);
            });
        })
    }catch {
        err => console.log(err);
    }
}
getBlogsInformation();