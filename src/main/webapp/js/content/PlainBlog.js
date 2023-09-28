"use strict";
function PlainBlog() {
    var ele = document.createElement("div");
    var content = `
    <div id=blog>
    <h1>Blog</h1>
    <div id="hw1">
        <h3 id="HomePage Hw">Homepage HW Blog</h3>
        <p>This blog is still underway. However you can check out the
            <a class="ContentLinks" href="blog" target="_blank">server-side blog</a>
            to find out upcoming content.
            Click <a class = "ContentLinks" href="pics/CIS3308 Lab2.pdf" target="_blank">here</a> to view doc form Lab02, or <a class="ContentLinks" href="pics/CIS3308 HW02.pdf" target="_blank">HW02.</a>
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
        <h3>Single Page Application HW Blog</h3>
        <p>
            There wasn't anything particularly "too" easy about this homework other than copy and pasting that was allowed.
            Being able to reference how to use the react elements and routing was very helpful though as it was just merely
            adapting it to my code.
            The challenging part was honestly the styling. It was tough having to work with multiple css files and having them 
            inherit and overlap. It was also tough because you have to keep in mind the html elements that are now in js files
            so it's just more to keep track of.
            The valuable part was being able to see how react works and how it can be used to create a single page application.
            The routing was very interesting and being able to see the xml in action. This homework was great for debugging though
            because I found myself having to do a decent amount. I think this module and the react are probably the most valuable 
            to me so far because they seem like the most practical and useful.
        </p>
    </div>
    <div id="Component_HW">
        <h3>Component HW Blog</h3>
        <p>
            This one was definitely a little bit more challenging than previous ones. I spent a lot of time because I forgot to include 
            text/babel. I don't think creating the functions was really all that challenging though being able to reference the sample code,
            It was just making sure to keep it clean so I could understand the flow of the code. However, there were times when the instructions 
            were a little unclear, in particular when we had to call our list functions, I spent a decent amount of time trying to understand the prompts.
            One thing that I did spend a lot of time on was actually inserting the code into the html files. 
            The example code in the document for the Routes worked for my react function, but would not work for my 
            JS templating one. I eventually did some StackOverflow research and found that I had to use render(). Although, it did not follow what was in the document,
            this allowed for it to work.
        </p>
</div> 
    `;
    ele.innerHTML = content;
    ele.classList.add("blog");
    return ele;
}