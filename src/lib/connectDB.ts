

let db;
export const connectDB = async () => {
    if(db) return db;
    try {
        const uri = process.env.NEXT_PUBLIC_MONGO_URI;
        const client = new MongoClient(uri,{
            serverApi : {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            },
        });
        db = client.db("bytemart");
        return db;
    } catch (error:unknown) {
        console.log(error)
    }
}