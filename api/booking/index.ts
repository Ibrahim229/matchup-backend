import { Router } from "express";
import getBookedEvents from "./get-client-available-times";
import createBook from "./create-book";
import cancelBook from "./cancel-book";
import updateBook from "./update-book";
import getbook from "./get-book";



const bookingRouter = Router();

bookingRouter.get('/getBookedEvents/:pitchID', getBookedEvents);
bookingRouter.post('/:pitchID', createBook);
bookingRouter.get('/:bookID', cancelBook);
bookingRouter.put('/:bookID', updateBook);
bookingRouter.get('', getbook);


export default bookingRouter;