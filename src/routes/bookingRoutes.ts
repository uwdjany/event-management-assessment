import express from "express"
import { isLoggedIn } from "../middlewares/authentication"
import BookingController from "../controllers/bookingController"

const router = express.Router()


router.post('/eventBooking', isLoggedIn,checkTicketAvailability, BookingController.createBooking)
router.put('/cancelbooking', isLoggedIn, BookingController.cancelBooking)

export default router
