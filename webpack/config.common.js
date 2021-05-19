const path = require("path");
const env = require("./env");
const rules = require("./rules");
const webpack = require("webpack");
const template = require("./template");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootDir = path.resolve(__dirname, "../");
const srcDir = path.join(rootDir, "src");
const viewsDir = path.join(srcDir, "views");

module.exports = {
  // https://github.com/webpack/webpack-dev-server/issues/2758
  target: env.isProductionMode ? "browserslist" : "web",

  output: {
    path: path.join(rootDir, "dist"),
  },

  entry: {
    // Main app entry
    app: path.join(srcDir, "app.js"),

    // Add shared components below. Only for dependencies.
    swiper: "swiper",
    "dom-purify": "dompurify",
    "progress-bar": "progressbar.js",
    shared: path.join(srcDir, "library/shared.js"),
    svgIcons: path.join(srcDir, "library/svgicons.js"),

    // Page entries. Add other page entries below.
    index: {
      import: path.join(viewsDir, "Index/index.js"),
      dependOn: ["dom-purify", "swiper", "progress-bar", "shared", "svgIcons"],
    },
    explore: {
      import: path.join(viewsDir, "Explore/explore.js"),
      dependOn: ["dom-purify", "shared"],
    },
    contentDetail: {
      import: path.join(viewsDir, "ContentDetail/contentDetail.js"),
      dependOn: ["swiper", "shared"],
    },
    lesson: {
      import: path.join(viewsDir, "Lesson/lesson.js"),
      dependOn: ["shared", "swiper"],
    },
  },

  module: {
    rules,
  },

  plugins: [
    new webpack.ProvidePlugin({
      _: "lodash",
    }),

    new HtmlWebpackPlugin(
      template("Index/layout.html", {
        includeEntries: [
          "dom-purify",
          "swiper",
          "progress-bar",
          "shared",
          "svgIcons",
          "index",
        ],
        title: "SLO v2-dev",
        filename: "index.html",
      })
    ),
    // Add other HtmlWebpackPlugin view instances like the one below:
    new HtmlWebpackPlugin(
      template("Explore/layout.html", {
        includeEntries: ["dom-purify", "shared", "explore"],
        title: "Explore – SLO v2-dev",
        filename: "explore/index.html",
        data: {
          items: [
            {
              title: "Applied Sport Psychology and Leadership in Sport",
              type: "Course",
              rating: 4.76,
              price: 92.99,
              permalink: "applied-sport-psychology-leadership-sport",
              cover: "https://i.imgur.com/RqmQKO3.jpg",
              description:
                "Enhance your knowledge of sport psychology from an athlete or coach perspective with this in depth applied course.",
              author: {
                name: "John Kosner",
                org: "Kosner Media",
                photo: "https://i.imgur.com/Ld7oEoT.jpg",
              },
            },
            {
              title: "How To Deal With Loss in Sport",
              type: "Course",
              rating: 3.4,
              price: 43.52,
              permalink: "how-to-deal-with-loss-in-sport",
              cover: "https://i.imgur.com/mu6bImD.jpg",
              description: "Learn how to use losses to get more wins",
              author: {
                name: "Rick Jones",
                org: "Kosner Media",
                photo: "https://i.imgur.com/NqPEpYD.png",
              },
            },
            {
              title:
                "The Complete Course on Sport Events and Facility Management",
              type: "Course",
              rating: 4.4,
              price: 0,
              permalink: "complete-course-sport-events-and-facility-management",
              cover: "https://i.imgur.com/Em4QCCW.jpg",
              description:
                "An In-Depth Look at the Work of Sports Event and Facility Managers and What it Takes to Run a Successful Sports Event",
              author: {
                name: "Jim Host",
                org: "International Management Group (IMG)",
                photo: "https://i.imgur.com/5ayUOK3.png",
              },
            },
          ],
        },
      })
    ),
    new HtmlWebpackPlugin(
      template("ContentDetail/layout.html", {
        includeEntries: ["swiper", "shared", "contentDetail"],
        title: "Sample Demo Course – SLO v2-dev",
        filename: "course/sample-demo-course.html",
      })
    ),
    new HtmlWebpackPlugin(
      template("Lesson/layout.html", {
        includeEntries: ["shared", "swiper", "lesson"],
        title: "Lesson #1 – Sample Demo Course – SLO v2-dev",
        filename: "course/sample-demo-lesson.html",
      })
    ),
    // Presentation
    new HtmlWebpackPlugin(
      template("ContentDetail/layout-dynamic.html", {
        includeEntries: ["swiper", "shared", "contentDetail"],
        title: "Applied Sport Psychology and Leadership in Sport – SLO v2-dev",
        filename:
          "courses/applied-sport-psychology-leadership-sport/index.html",
        data: {
          bread_nav: ["Explore", "Health &amp; Fitness", "Sport Psychology"],
          title: "Applied Sport Psychology and Leadership in Sport",
          about_short:
            "<p>Enhance your knowledge of sport psychology from an athlete or coach perspective with this in depth applied course.</p>",
          about_long:
            "<p>With over 12 hours of highly engaging video content, consisting of 57 video lectures including numerous resources and examples from contemporary sport, this course is presented as an applied sport psychology course for coaches, athletes and leaders or anybody considering some learning in this area. The course is pitched at a very attainable level to cater for all learners - ie NVQ Level 4 in UK. This would equate to equivalent of QQI or FETAC Level 6 standard course in Ireland. or pre-university course in other countries.</p><p>With over 20 years coaching experience across a range of sports and levels, from child and youth level sport up to and including elite level, I have developed this course to help you broaden your understanding of sport psychology in an easy and practical manner.  This is additionally informed by over 10 years sport psychology experience in elite level high performance settings, working with athletes up to and including Olympic level (see bio for further details). With applied references to the most cutting edge research in sport psychology, I have included countless examples of how the best teams, coaches and athletes across the world, apply best practice in utilization of sport psychology in their pursuit of excellence.</p><p>Using a series of multiple choice quizzes and a complimentary 45 page work-book with 33 separate practical and applied tasks, this extensive course is designed to significantly enhance your knowledge in this area as an athlete, coach or leader in your field.  It also includes complimentary deep breathing and relaxation exercises with some practical advice around implementing such practices. Those who finish the course will receive  certification on completion.</p><p>See <strong>Course Curriculum</strong> section below for the level of depth across 7 units of work.</p><p>Thank you for taking the time to research this course. I look forward to you signing up and seeing you on the other side, where you will greatly enhance your knowledge in this area.</p>",
          objectives:
            "<p>This course is suitable for athletes or coaches involved in sport or any type of management (sport, military or business) at any level - or anybody that has an interest in the science behind sport and performance psychology. This course is also an excellent starting point for anybody considering further study or career options in the area of sport or performance psychology.</p>",
          type: "Course",
          rating: 4.76,
          enrolled: 50,
          lang: "English",
          price: 92.99,
          is_purchased: false,
          cover: "https://i.imgur.com/RqmQKO3.jpg",
          curriculum: [
            {
              name: "Unit 1 - Introduction to Sport Psychology",
              lessons: [
                {
                  title: "Welcome Message",
                  type: "Video",
                  duration: 69,
                },
                {
                  title: "Introduction to Sport Psychology",
                  type: "Video",
                  duration: 380,
                },
                {
                  title: "History of Sport Psychology",
                  type: "Video",
                  duration: 490,
                },
                {
                  title: "The Role of a Sport Psychologist",
                  type: "Video",
                  duration: 551,
                },
              ],
            },
            {
              name: "Unit 2 – Sport Psychology Social Perspectives",
              lessons: [
                {
                  title: "Unit 2 Introduction",
                  type: "Video",
                  duration: 58,
                },
                {
                  title: "Children in Youth Sport",
                  type: "Webinar",
                  duration: 436,
                },
                {
                  title: "Dropout From Youth Sport",
                  type: "Webinar",
                  duration: 795,
                },
                {
                  title: "Gender Differentiation - Women in Sport",
                  type: "Webinar",
                  duration: 758,
                },
                {
                  title: "Disability in Sport",
                  type: "Webinar",
                  duration: 317,
                },
                {
                  title: "Parenting in Sport",
                  type: "Webinar",
                  duration: 973,
                },
                {
                  title: "Aggression in Sport",
                  type: "Webinar",
                  duration: 786,
                },
                {
                  title: "Character Development and Good Sporting Behaviour",
                  type: "Webinar",
                  duration: 387,
                },
              ],
            },
            {
              name: "Unit 3 - Individual Considerations within Sport",
              lessons: [
                { title: "Unit 3 Introduction", type: "Video", duration: 0 },
                {
                  title: "Arousal, Stress and Anxiety",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Example 1 - Anxiety in Sport",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Example 2 - Anxiety in Sport",
                  type: "Video",
                  duration: 0,
                },
                {
                  title:
                    "How Over-arousal, Stress and Anxiety Affect Performance",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Regulating Anxiety, Over-arousal and Stress",
                  type: "Video",
                  duration: 0,
                },
                {
                  title:
                    "Attention Control, Processing Efficiency and Ironic Effects",
                  type: "Video",
                  duration: 0,
                },
                { title: "Personality in Sport", type: "Video", duration: 0 },
              ],
            },
            {
              name: "Unit 4 - Introduction to psychological skills training (PST)",
              lessons: [
                { title: "Unit 4 Introduction", type: "Video", duration: 0 },
                {
                  title: "Introduction to PST and Attentional Focus",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Self Talk and Self Confidence",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Visualisation / Imagery",
                  type: "Video",
                  duration: 0,
                },
                { title: "Goal Setting 1", type: "Video", duration: 0 },
                {
                  title:
                    "Performance Profiling and Goal Setting - Applied Practice",
                  type: "Video",
                  duration: 0,
                },
                { title: "Arousal Regulation 1", type: "Video", duration: 0 },
                { title: "Arousal Regulation 2", type: "Video", duration: 0 },
                { title: "Mindfulness in Sport", type: "Video", duration: 0 },
              ],
            },
            {
              name: "Unit 5 - Team Processes: Cohesion and Motivation",
              lessons: [
                { title: "Unit 5 Introduction", type: "Video", duration: 0 },
                {
                  title: "Group and Team Dynamics",
                  type: "Video",
                  duration: 0,
                },
                { title: "Group Cohesion 1", type: "Video", duration: 0 },
                {
                  title: "Group Cohesion and Social Loafing",
                  type: "Video",
                  duration: 0,
                },
                {
                  title:
                    "The Role of Self-Efficacy in Performance and Motivation",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Introduction to Motivation",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Theories of Motivation 1",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Theories of Motivation 2",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Theories of Motivation 3",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Guidelines For Improving Motivation",
                  type: "Video",
                  duration: 0,
                },
              ],
            },
            {
              name: "Unit 6 - Effective Leadership and Communication",
              lessons: [
                {
                  title: "Characteristics of Effective Leaders",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Leadership - Athlete Needs",
                  type: "Video",
                  duration: 0,
                },
                { title: "Leadership Styles", type: "Video", duration: 0 },
                {
                  title: "Transformational Leadership",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Psychological Models of Leadership",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Process of Effective Communication",
                  type: "Video",
                  duration: 0,
                },
                {
                  title:
                    "Creating a Positive Team Climate - Introduction & The Leicester Effect",
                  type: "Video",
                  duration: 0,
                },
                {
                  title:
                    "Creating a Positive Team Climate - the practical stuff - Part 1",
                  type: "Video",
                  duration: 0,
                },
                {
                  title:
                    "Creating a Positive Team Climate - the practical stuff - Part 2",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Effective Leadership - A Values Based Approach 1",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Effective Leadership - A Values Based Approach 2",
                  type: "Video",
                  duration: 0,
                },
                {
                  title:
                    "Unit 5 & 6 Quiz - Leadership, Communication and Motivation",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Effective Leadership - Self Reflection",
                  type: "Video",
                  duration: 0,
                },
              ],
            },
            {
              name: "Unit 7 - Enhancing Health and Well-being",
              lessons: [
                { title: "Resilience", type: "Video", duration: 0 },
                {
                  title: "Developing Resilience and Mental Toughness",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Psychological Well-being - Anxiety & Depression",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Managing Anxiety and Depression",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Psychological Well-being - Athletic Identity",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Burnout and Over-training",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Well-being and Lifestyle Factors - Social Media",
                  type: "Video",
                  duration: 0,
                },
                {
                  title:
                    "Well-being and Lifestyle Factors - Gambling and Substance Misuse",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Exercise Behaviour and Adherence",
                  type: "Video",
                  duration: 0,
                },
                {
                  title: "Exit Pass 7 and Course Wrap-up",
                  type: "Video",
                  duration: 0,
                },
              ],
            },
          ],
          author: {
            name: "John Kosner",
            org: "Kosner Media",
            photo: "https://i.imgur.com/Ld7oEoT.jpg",
            rating: 4.0,
            about:
              "is a US based digital media executive. He is currently the president ofKosner Media, a digital and sports consulting company. He is also an investor and advisor in sports technology startups as part of Micromanagement Ventures, a portfolio he created with the late NBA Commissioner Emeritus David Sternin 2018. He most recently served as executive vicepresident, digital and print mediafor ESPN from January 2012 through June 2017. He had overseen ESPN.com  since 2003 and was an employee with ESPN for over 20 years",
          },
        },
      })
    ),
    new HtmlWebpackPlugin(
      template("ContentDetail/layout-dynamic.html", {
        includeEntries: ["swiper", "shared", "contentDetail"],
        title: "How To Deal With Loss in Sport – SLO v2-dev",
        filename: "courses/how-to-deal-with-loss-in-sport/index.html",
        data: {
          bread_nav: ["Explore", "Health &amp; Fitness", "Sport Psychology"],
          title: "How To Deal With Loss in Sport",
          about_short: "<p>Learn how to use losses to get more wins</p>",
          about_long:
            "<p>I created this course because all athletes have to deal with losses. In this course no matter the sport you participate in you can learn how to perceive and approach properly all losses so they help you (YES THEY CAN HELP YOU) improve and move to the highest possible level. This course is based on real playing and coaching experiences so you can be sure that methods and tips included here will be effective for you. If you ever had doubts or negative thoughts after the loss THIS COURSE IS FOR YOU!</p><p>Athletes think that only winning matters. That's a wrong mindset. You should always try to win but the final result is not under your control. You can play badly and win as also you can have your best performance and lose against better opponent. That is why it is crucial to focus on performance and activities under your control than to put stress on your body and mind by not accepting loses in your career.</p><p>Did LeBron James win all his basketball games? Did Lionel Messi score every time he attempted? Of course they didn't. They made many mistakes and lost lot of matches. They know that is part of the process and with losses they still managed to be icons of sport. One or 2 losses don't have an impact on your future unless you don't know how to approach them. If the loss means to you that you can't succeed in the future then you have a big obstacle in front of you.</p><p>I created this course because all athletes have to deal with losses. In this course no matter the sport you participate in you can learn how to perceive and approach properly all losses so they help you (YES THEY CAN HELP YOU) improve and move to the highest possible level. This course is based on real playing and coaching experiences so you can be sure that methods and tips included here will be effective for you. If you ever had doubts or negative thoughts after the loss THIS COURSE IS FOR YOU!</p>",
          objectives:
            "<p>After taking this course you will learn that losses don't have to have negative impact on your career. You will learn how to use losses to progress and become better athlete. It is impossible to win all the time so with knowledge from this course you will always improve - no matter the score!</p>",
          type: "Course",
          rating: 3.4,
          enrolled: 7,
          lang: "English",
          price: 43.52,
          is_purchased: true,
          cover: "https://i.imgur.com/mu6bImD.jpg",
          curriculum: [
            {
              name: "Introduction",
              lessons: [
                {
                  title: "Welcome",
                  type: "Video",
                  duration: 262,
                },
                {
                  title: "Who is this course for?",
                  type: "Video",
                  duration: 164,
                },
                {
                  title: "How can this course help you?",
                  type: "Video",
                  duration: 243,
                },
                {
                  title: "What will you achieve after taking this course?",
                  type: "Video",
                  duration: 241,
                },
              ],
            },
            {
              name: "Understanding",
              lessons: [
                { title: "The reality of sport", type: "Video", duration: 396 },
                {
                  title: "Avoid the loss VS Strive to win",
                  type: "Video",
                  duration: 234,
                },
                {
                  title: "Do Champions make mistakes?",
                  type: "Video",
                  duration: 233,
                },
                {
                  title: "Achieve your potential",
                  type: "Video",
                  duration: 271,
                },
              ],
            },
            {
              name: "Practical Tools",
              lessons: [
                {
                  title: "Proper approach to losing",
                  type: "Video",
                  duration: 271,
                },
                { title: "Control your loss", type: "Video", duration: 286 },
                {
                  title: "Typical mistakes after lost match",
                  type: "Video",
                  duration: 591,
                },
                {
                  title: "What should you do after lost match?",
                  type: "Video",
                  duration: 298,
                },
                { title: "Find your percentage", type: "Video", duration: 397 },
              ],
            },
            {
              name: "Summary",
              lessons: [
                {
                  title: "Lesson from this course",
                  type: "Video",
                  duration: 272,
                },
                { title: "Implementation", type: "Video", duration: 338 },
                { title: "New mindset", type: "Video", duration: 206 },
              ],
            },
          ],
          author: {
            name: "Rick Jones",
            org: "Kosner Media",
            photo: "https://i.imgur.com/NqPEpYD.png",
            rating: 4.6,
            about:
              "is a US based digital media executive. He is currently the president ofKosner Media, a digital and sports consulting company. He is also an investor and advisor in sports technology startups as part of Micromanagement Ventures, a portfolio he created with the late NBA Commissioner Emeritus David Sternin 2018. He most recently served as executive vicepresident, digital and print mediafor ESPN from January 2012 through June 2017. He had overseen ESPN.com  since 2003 and was an employee with ESPN for over 20 years",
          },
        },
      })
    ),
    new HtmlWebpackPlugin(
      template("ContentDetail/layout-dynamic.html", {
        includeEntries: ["swiper", "shared", "contentDetail"],
        title:
          "The Complete Course on Sport Events and Facility Management – SLO v2-dev",
        filename:
          "courses/complete-course-sport-events-and-facility-management/index.html",
        data: {
          bread_nav: ["Explore", "Sports", "Sports Management"],
          title: "The Complete Course on Sport Events and Facility Management",
          about_short:
            "<p>An In-Depth Look at the Work of Sports Event and Facility Managers and What it Takes to Run a Successful Sports Event</p>",
          about_long:
            "<p>This course has been specifically designed to give you an understanding of how sports events are planned from the ground up. If you’re aiming for a career in the sports industry, particularly in events or facility management, this course will prepare you and help to provide you with the knowledge you need to succeed. Perhaps you’re just looking for more information on what goes on behind the scenes of major sporting events, or you’d like to hold your own event. Everything you need to know is explained in this course.</p><p>The sports industry is worth billions of dollar,s and each year and thousands of events are held around the world each year. Sports events come in all shapes and sizes, with hundreds of different sports each with their own specific requirements. The role of the sports event manager is to understand these requirements and the needs of the spectators and make sure everything comes together.</p><p>To give you a broader idea of sports event, several key areas are discussed, but there is also a chapter that explores three case studies in detail. You will see real examples of three very different sporting events and how the planning process differed for each one. You’ll see the effects that sports events can have on the local area, on the fans and on the people taking part. It’s important for sports event managers to consider the social effects of the events and what it means for the wider sports community.</p><p>This course uses lots of real examples to help you to understand the theories explained throughout the chapters. Each chapter will give you an insight into a different area of event management. You’ll discover all the different types of sporting events, including multi-day events, one-off events and open events and their counterparts. You’ll learn the challenges and requirements involved in the planning stage of each and what it takes for a sports event manager to successfully hold each event.</p><p>You’ll also learn about event feasibility and what goes into the early planning stages of the event. This includes how an event chooses its aims and the way that the aims of the event will shape much of the planning phase. This also includes learning about how facilities are constructed and how sports events need to consider certain areas when designing and constructing new arenas and stadiums.</p><p>The course will also explain the role of event managers in hiring and managing staff, creating memorable experiences for the fans and risk assessment. All of these are important areas, and the course will cover each with real examples and clear explanations of the work that goes into these aspects. There’s also discussion on event sponsorships, including learning why sponsorships are so important to the events and why companies pay big money to sponsor sports. The course even shows how a sponsor is chosen and the importance of choosing the right sponsor for the event.</p><p>Technology has been a major cause of the growth of the sports industry over the years, and the course covers how it is being used to improve sporting events. You’ll learn about how technology is being adapted to give fans a better experience in the stadium and how facility managers can make sports venues a more comfortable place to visit.</p><p>Finally, the course also covers the changes that the sports industry may face over the coming years. Situations such as the COVID-19 pandemic have cast doubt over the future of many major sporting events, and event managers need to adapt to these changes. Part of being a successful event manager is being able to adapt your plan to new situations as they occur. This course will give you an idea of how these adaptations can be used to protect the future of sporting events and how fans can continue to watch and enjoy live sports thanks to the work of sports event managers.</p>",
          objectives:
            "<p><ul><li>What sports event management involves and the key skills that an event or facility manager must have</li><li>Why sports event and facility managers are so important for the sports industry</li><li>The importance of human resources in planning and holding sporting events</li><li>Why event planners and facility managers should strive to create memorable experiences for fans</li></ul></p>",
          type: "Course",
          rating: 4.4,
          enrolled: 60,
          lang: "English",
          price: 0,
          is_purchased: false,
          cover: "https://i.imgur.com/Em4QCCW.jpg",
          curriculum: [
            {
              name: "Introduction",
              lessons: [
                { title: "Introduction", type: "Podcast", duration: 966 },
                {
                  title: "Types of Sporting Events",
                  type: "Webinar",
                  duration: 1472,
                },
                { title: "Event Feasibility", type: "Webinar", duration: 2044 },
                { title: "Human Resources", type: "Webinar", duration: 1205 },
                { title: "Event Hospitality", type: "Webinar", duration: 1115 },
                { title: "Risk Management", type: "Webinar", duration: 1205 },
                {
                  title: "Event Sponsorships",
                  type: "Webinar",
                  duration: 1416,
                },
                {
                  title: "Sustainability and Social Responsibility",
                  type: "Webinar",
                  duration: 989,
                },
                {
                  title: "Sports Events Case Studies",
                  type: "Webinar",
                  duration: 1469,
                },
                {
                  title: "The Future of Sports Events",
                  type: "Webinar",
                  duration: 745,
                },
                { title: "Conclusion", type: "Video", duration: 450 },
              ],
            },
          ],
          author: {
            name: "Jim Host",
            org: "International Management Group (IMG)",
            photo: "https://i.imgur.com/5ayUOK3.png",
            rating: 5.0,
            about:
              "An American businessman best known for founding Host Communications, a pioneering collegiate sports marketing and production services company that was acquired by IMG in 2007 for $74.3 million.   Host is credited with implementing the first collegiate corporate marketing program with the NCAA in 1985  In 1983, Host Communications introduced what became known as the NCAA's Corporate Partner Program and in 1985 the first collegiate corporate marketing program was implemented.<br/><br/>In 2003, Host retired as CEO of Host Communications. In 2008, International Management Group (IMG), a global sports and talent management group, bought Host Communications for $74.3 million. Joining forces with Collegiate Licensing Company, the two formed IMG College, which represents the multimedia rights for over 90 universities, conferences, collegiate associations and venues. Additionally, IMG College holds licensing rights to more than 150 colleges and universities.",
          },
        },
      })
    ),
  ],

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
};
