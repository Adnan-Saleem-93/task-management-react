import { Model, Response, createServer } from "miragejs";

const characters =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
	let result = " ";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

export function makeServer({ environment = "test" }) {
	let server = createServer({
		environment,
		models: {
			users: Model,
			tasks: Model,
		},
		seeds(server) {
			// create initial users
			server.create("user", {
				email: "test@test.com",
				password: "123Abc!@#",
				groupId: "wdr33421rdfsfwer",
			});
			server.create("user", {
				email: "example@gmail.com",
				password: "123Abc!@#",
				groupId: "wdr33421rdfsfwer",
			});

			// create initial tasks
			server.create("task", {
				id: "fsdfs23ewdfs_fsdfsdf",
				title: "Project Meeting",
				description: "Meeting to discuss project details and deadlines",
				isComplete: false,
				groupId: "wdr33421rdfsfwer",
			});
			server.create("task", {
				id: "kjlkjlkwfdnfdsf((333@@",
				title: "Plan tasks",
				description:
					"Let's have a proper strategy for how we will handle tasks according to the deadline, so that we don't fall behind schedule.",
				isComplete: false,
				groupId: "fdf-3*&&33663fdf",
			});
		},
		routes() {
			this.post("/api/login", (schema, request) => {
				let users = schema.users.all().models; // get all users model
				const existingUser = users.find((x) => {
					return x.attrs.email === request.requestBody.email;
				}); // check if user exists

				// if user exists
				if (existingUser) {
					// check if password is correct
					const isPasswordCorrect =
						existingUser.attrs.password === request.requestBody.password
							? true
							: false;
					if (!isPasswordCorrect) {
						// return 400 response if password is not correct
						return new Response(
							400,
							{ headers: "headers" },
							{ errors: ["Incorrect password"] }
						);
					}
					// otherwise return user details
					return existingUser;
				}

				// return 404 response if user is not found
				return new Response(
					404,
					{ headers: "headers" },
					{ errors: ["User not found"] }
				);
			});
			this.post("/api/register", (schema, request) => {
				const body = request.requestBody;

				let users = schema.users.all().models;

				// check if user exists
				const existingUser = users.find((x) => {
					return x.attrs.email === body.email;
				});

				// if not, create new user
				if (!existingUser) {
					const newUser = schema.users.create(body);
					return newUser;
				}

				// otherwise return error
				return new Response(
					404,
					{ headers: "headers" },
					{ errors: ["User already exists"] }
				);
			});
			this.get("/api/tasks/:groupId", (schema, request) => {
				const groupId = request.params.groupId;

				let tasks = schema.tasks.all().models;

				// get records based on current logged in user's groupId
				const fetchedTasks = tasks.filter((x) => {
					return x.attrs.groupId === groupId;
				});

				return fetchedTasks;
			});
			this.post("/api/tasks", (schema, request) => {
				const body = request.requestBody;

				body.id = generateString(12); // generate random string for task id
				const newTask = schema.tasks.create(body);

				return { task: newTask };
			});
			this.put("/api/task/mark/:id", (schema, request) => {
				const id = request.params.id;
				const matchedTask = schema.tasks.find(id);
				const attrs = {
					...matchedTask.attrs,
					isComplete: !matchedTask.attrs.isComplete,
				};

				return schema.tasks.find(id).update(attrs);
			});
			this.delete("/api/task/delete/:id", (schema, request) => {
				const id = request.params.id;
				return schema.tasks.find(id).destroy(); // delete task by id
			});
		},
	});
	return server;
}
