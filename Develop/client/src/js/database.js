import { openDB } from "idb";

const initdb = async () =>
	openDB("jate", 1, {
		upgrade(db) {
			if (db.objectStoreNames.contains("jate")) {
				console.log("jate database already exists");
				return;
			}
			db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
			console.log("jate database created");
		},
	});

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
	console.log("Post to the database");

	// create connection to the database and version we want to use
	const jateDb = await openDB("jate", 1);

	// create new transaction and specify the database and data privileges
	const tx = jateDb.transaction("jate", "readwrite");

	// open the desired objectstore
	const store = tx.objectStore("jate");

	// use .add() method on the store and pass in the content
	const request = store.put({ id: 1, value: content });

	// get confirmation
	const result = await request;
	console.log("Data saved to the database");
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
	console.log("GET all data from the database");
	const jateDb = await openDB("jate", 1);
	const tx = jateDb.transaction("jate", "readonly");
	const store = tx.objectStore("jate");
	const request = store.getAll();
	const result = await request;
	console.log("result.value", result);
	return result.value;
};

initdb();
