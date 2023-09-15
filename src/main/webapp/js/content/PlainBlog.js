function PlainBlog() {
    var ele = document.createElement("div");
    var content = `
    <div id=blog>
    <div id="hw1">
        <h2 id="blog1">Blog</h2>
        <p>This blog is still underway. However you can check out the
            <a class="ContentLinks" href="blog" target="_blank">server-side blog</a>
            to find out upcoming content.
            Click <a class = "ContentLinks" href="CIS3308 Lab2.pdf" target="_blank">here</a> to view doc form Lab02, or <a class="ContentLinks" href="CIS3308 HW02.pdf">HW02.</a>
        </p>
        <p>The custom datatable will basically contain each user entry of a new vending machine that is found and all
            its relevant information.</p>
        <ul>
            <li>VendingID, int, primary key</li>
            <li>Image, varchar(1000), (considering NULLABLE)</li>
            <li>Date, Date, (date item was made)</li>
            <li>Coordinates, (either type Geography or decimal, depending on implementation)</li>
            <li>Machine Type, varchar(50), would be able to choose from a select options like : food, drink, dispensery
                ...</li>
            <li>Description, varchar(500), (user gives any detail about the machine), NULLABLE </li>
            <li>isBillsAndCoins, tinyint/int, (boolean)</li>
            <li>acceptsEPayments,tinyint/int, (boolean)</li>
            <li>Review, int, (out 5 stars basically) , NULLABLE</li>
        </ul>
        <br>
        <br>
        <!-- Talk about database experience -->
        <p>I got some database experience during my summer internship.
            I used SQL and Microsoft SQL Management Studio.
            I never really used the interface that the Studio provided to edit items, more so just for visualizing
            (SELECT) the table.
            Always did things through SQL queries. </p>
        <!-- Talk about Web experience -->
        <p>
            <img id="Map" src="pics/Map.png" title="Map with Pins">
            The web development experience was also during my summer internship as well as some learning through online
            resources like CodeCademy and freecodecamp for mostly the basics of JS,CSS,HTML.
            I worked on a full stack project during the internship with supervision from a senior dev so I did a great
            majority of the coding of both front and backend development. I used Visual Studio, ASP.NET, and C#, so
            slightly different backend language from java.
            But still did the HTML and used libraries like JQuery Datatables. I left the majority of the CSS to
            Bootstrap with some custom stylings when needed. Used JS and ajax to talk with controller. Used an MVC
            style.
        </p>
        <!-- Talk about easy, challenging, valuable things -->
        <p>
            The easy stuff was all the things related to HTML, they are very straight forward, and when rendered, easy
            to visualize and understand what things do.
            The challenging thing is just using css in general in order to get something specifically that you envision.
            Especially because there are so many options to mess around, it can sometimes be overwhelming to know what
            to use, how to use it, or if something even exists to achieve a goal.
            The valuable part however is the CSS guiding that the module presented. Valuable because of the struggle
            aforementioned. Being able to practice the fundamentals to a "barebones" style to truly understand how it
            turns out without any extra details on it, allows me to really refresh and refine css elements.
        </p>
    </div>
    <div id="SPA_HW">
        <h3>Single Page Application HW</h3>
        <p> ADD TEXT</p>
    </div>
</div> 
    `;
    ele.innerHTML = content;
    ele.classList.add("blog");
    return ele;
}