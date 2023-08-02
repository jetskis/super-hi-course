import { useLoaderData } from '@remix-run/react'
import mongoose from "mongoose";

let db;

// async function connect() {
//   if (db) return db;

//   console.log('process')

//   if (process?.env?.NODE_ENV === "production") {
//     db = await mongoose.connect(process?.env?.MONGODB_URL, {
//       useNewUrlParser: true,
//     });
//   } else {
//     // in development, need to store the db connection in a global variable
//     // this is because the dev server purges the require cache on every request
//     // and will cause multiple connections to be made
//     if (!global.__db) {
//       global.__db = await mongoose.connect(process?.env?.MONGODB_URL, {
//         useNewUrlParser: true,
//       });
//     }
//     db = global.__db;
//   }
//   return db;
// }

// export async function loader({ context}) {
//   console.log('LOADER')
//   if (db) return db;

//   console.log('process', context )

//   if (context?.env?.NODE_ENV === "production") {
//     db = await mongoose.connect(context?.env?.MONGODB_URL, {
//       useNewUrlParser: true,
//     });
//   } else {
//     // in development, need to store the db connection in a global variable
//     // this is because the dev server purges the require cache on every request
//     // and will cause multiple connections to be made
//     if (!global.__db) {
//       global.__db = await mongoose.connect(context?.env?.MONGODB_URL, {
//         useNewUrlParser: true,
//       });
//     }
//     db = global.__db;
//   }
//   return {
//     connect: db,
//     mongoose
//   }
// }

// async function connect() {
//   const db = useLoaderData()
//   console.log('db', db)
//   return (
//     <div>test</div>
//   )
//   // return db
// }

export { mongoose, db };