export const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open("TodoDatabase", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains("TodoStore")) {
                db.createObjectStore("TodoStore", { keyPath: "id", autoIncrement: true });
            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export const saveList = async (list) => {
    const db = await openDB();
    const transaction = db.transaction("TodoStore", "readwrite");
    const store = transaction.objectStore("TodoStore");

    list.forEach(todo => {
        store.put(todo);
    });

    return transaction.complete;
};

export const getList = async () => {
    const db = await openDB();
    const transaction = db.transaction("TodoStore", "readonly");
    const store = transaction.objectStore("TodoStore");

    return new Promise((resolve) => {
        const request = store.getAll();
        request.onsuccess = (event) => resolve(event.target.result);
    });
};

export const deleteTask = async (id) => {
    const db = await openDB();
    const transaction = db.transaction("TodoStore", "readwrite");
    const store = transaction.objectStore("TodoStore");
    store.delete(id);

    return transaction.complete;
};