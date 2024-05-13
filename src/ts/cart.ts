import { Query } from "appwrite";
import { ID, account, databases } from "./appwrite";

const addToCart = async (bookId: string) => {
    try {
        const user = await account.get();
        if (user) {
            const userExist = await databases.listDocuments('6617abe7972b1276173d', '663b1ac20038f2d26e62', [ Query.equal('userId', [user.$id]) ]);
            console.log('user', user);
            console.log('userExist', userExist);
            if(userExist.documents.length === 0) {
                const addBook = await databases.createDocument('6617abe7972b1276173d', '663b1ac20038f2d26e62', ID.unique(), {
                    'userId' : user.$id,
                    'username' : user.name,
                    'cart' : [bookId],
                }).catch ((error: any) => {console.log(`ERROR ADDING BOOKS TO EXISTING USER, ${error}`)});
            }else{
                const { $id, cart } = userExist.documents[0];
                cart.push(bookId);
                const addBook = await databases.updateDocument('6617abe7972b1276173d', '663b1ac20038f2d26e62', $id, {'cart': cart});
            }
        }
    } catch {
        (err: any) => console.log(err);
    }
}
const removeBookFromCart = async (documentId: string, bookId: string) => {
    console.log('bookId', bookId);
    const getUserCartDetails = await databases.getDocument('6617abe7972b1276173d', '663b1ac20038f2d26e62', documentId);
    console.log('BEFORE REMOVING CART',getUserCartDetails.cart);
    const {cart} = getUserCartDetails;
    cart.splice(cart.indexOf(bookId), 1);
    console.log('AFTER REMOVING CART', cart);
    const removeBook = await databases.updateDocument('6617abe7972b1276173d', '663b1ac20038f2d26e62', documentId, {'cart': cart});
    if(removeBook) {
        console.log('USER CART AFTER REMOVING = ', removeBook);
    }
}

export {removeBookFromCart};
export default addToCart;