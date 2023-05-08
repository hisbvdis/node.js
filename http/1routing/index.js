import { createServer } from "http";
import url from "url";
import querystring from "node:querystring";


/* Database */
let users = [
  {id: 1, name: "Roma", age: 30},
  {id: 2, name: "Vasya", age: 55},
]


const itemsComponent = (items=[]) => {
  return (/* html */`
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${items.map(({id, name, age}) => {
          return (/* html */`
            <tr>
              <th>${id}</th>
              <th>${name}</th>
              <th>${age}</th>
              <td>
                <a href="/edit?id=${id}">Edit</a>
                <a href="/delete?id=${id}">Delete</a>
              </td>
            </tr>
          `)
        }).join("")}
      </tbody>
    </table>
  `)
}


const addItemComponent = () => (/* html */`
  <form method="POST" action="/add">
    <input type="text" name="name" placeholder="name" value="Roma" required autofocus/>
    <input type="number" name="age" placeholder="age" value="30" required/>
    <button type="submit">Add</button>
  </form>
`)


const editItemComponent = ({id, name, age}) => (/* html */`
  <form method="POST" action="/edit?id=${id}">
    <input type="text" name="name" placeholder="name" value="${name}" autofocus/>
    <input type="number" name="age" placeholder="age" value="${age}"/>
    <button type="submit">Save</button>
  </form>
`)


const server = createServer((req, res) => {
  // Get parts of URL from "request"
  const { pathname, query } = url.parse(req.url, true);
  // Get request method (GET, POST)
  const { method } = req;

  res.setHeader("Content-Type", "text/html; charset=utf-8;");

    // ROUTING
  switch (pathname) {
    // Route "/"
    case "/": {
      res.write(/* html */`<h2>List</h2>`);
      res.write(itemsComponent(users));
      res.write(/* html */`<a href="/add">Add item</a>`);
      break;
    }

    // Route "/add"
    case "/add": {
      if (method === "GET") {
        res.write(/* html */`<h2>New item</h2>`);
        res.write(addItemComponent());
      }
      else if (method === "POST") {
        let body = [];
        req
          .on("data", (chunk) => {
            body.push(chunk);
          })
          .on("end", () => {
            body = querystring.parse(Buffer.concat(body).toString());
            users.push({id: users.at(-1)?.id + 1 || 1, name: body.name, age: body.age});
          })

        res.statusCode = 302;
        res.setHeader("Location", "/");
      }
      break;
    }

    // Route "/edit"
    case "/edit": {
      if (method === "GET") {
        const item = users.find((item) => item.id === Number(query.id));
        res.write(/* html */`<h2>Edit item</h2>`);
        res.write(editItemComponent(item));
      }
      else if (method === "POST") {
        if (query.id) {
          let body = [];
          req
            .on("data", (chunk) => {
              body.push(chunk);
            })
            .on("end", () => {
              body = querystring.parse(Buffer.concat(body).toString());
              const itemIndex = users.findIndex(({id}) => id === Number(query.id));
              users[itemIndex].name = body.name;
              users[itemIndex].age = body.age;
            });
          res.statusCode = 302;
          res.setHeader("Location", "/");
        }
      }
      break;
    }

    // Route "/delete"
    case "/delete": {
      users = users.filter((el) => el.id !== Number(query.id));
      res.statusCode = 302;
      res.setHeader("Location", "/");
      break;
    }

    // Route "Anything else"
    default: {
      res.statusCode = 404;
      res.write(/* html */`<h2>404 — Not found</h2>`);
    }
  }
  
  // Send response
  res.end();
})


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
