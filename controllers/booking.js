const roomsData = [
  {
    room_id: 1,
    room_name: "room-1",
    room_status: "available",
    amenities: "Tv,Washing Machine,Iron box",
    seats: 4,
    price_per_hour: 1000,
  },
  {
    room_id: 2,
    room_name: "room-2",
    room_status: "available",
    amenities: "Tv,Washing Machine,Iron box",
    seats: 4,
    price_per_hour: 2000,
  },
  {
    room_id: 3,
    room_name: "room-3",
    room_status: "available",
    amenities: "Tv,Washing Machine,Iron box",
    seats: 2,
    price_per_hour: 3000,
  },
];

const bookingRoom = [];

// All Room Details
export const getAllRooms = (req, res) => {
  res.status(200).json({
    message: "All Room Details fetched Successfully",
    data: roomsData,
  });
};

// Creating a New Room
export const createRoom = (req, res) => {
  try {
    const { room_name, room_status, seats, price_per_hour, amenities } =
      req.body;

    let id = roomsData.length + 1;
    let newRoom = {
      room_id: id,
      room_name,
      room_status,
      amenities,
      seats,
      price_per_hour,
    };

    roomsData.push(newRoom);
    res
      .status(200)
      .json({ message: "New Room Added Successfully!", data: roomsData });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to book room
export const bookRoom = (req, res) => {
  const { customer_name, date, start_time, end_time, roomId } = req.body;

  let room = roomsData.filter(
    (e) => e.room_status === "available" && e.room_id === roomId
  );

  if (!room) {
    return res.status(400).json({ message: "Room is not available" });
  } else {
    let bookingRoomsDate = bookingRoom.filter(
      (room) => room.booking_date === date
    );

    if (bookingRoomsDate.length > 0) {
      return res.status(400).json({
        message: "Room Already Booked",
      });
    } else {
      let booking = {
        roomID: roomId,
        customer_name,
        start_time,
        end_time,
        date: date,
        booking_id: bookingRoom.length + 1,
        booking_date: date,
        status: "Booked",
      };
      bookingRoom.push(booking);
      return res.status(200).json({
        message: "Room Booked Successfully",
        RoomBooked: bookingRoom,
      });
    }
  }
};

// To get all booked rooms
export const getAllBookedRooms = (req, res) => {
  res.status(200).json({
    message: "All booked Room Details fetched Successfully",
    data: bookingRoom,
  });
};

// To display All customer booked data
export const AllCustomersBookedData = (req, res) => {
  const customerdata = bookingRoom.map((booking) => {
    const Room = roomsData.find((i) => i.room_id === booking.roomID);
    return {
      Room_id: booking.roomID,
      Customer_Name: booking.customer_name,
      Room_Name: Room ? roomsData.room_name : "Room",
      Date: booking.Date,
      start_time: booking.start_time,
      end_time: booking.end_time,
    };
  });
  res.status(200).json({
    message: "Successfully Fethched All Customer with BookedRoom  Details",
    data: customerdata,
  });
};

// To display all customers room booked data along with booking count
export const CustomerBookingDetails = (req, res) => {
  const customerBookings = {};

  bookingRoom.forEach((booking) => {
    const {
      roomID,
      customer_name,
      booking_date,
      start_time,
      end_time,
      booking_id,
      status,
    } = booking;

    if (!customerBookings[customer_name]) {
      customerBookings[customer_name] = [];
    }

    customerBookings[customer_name].push({
      roomID,
      booking_date,
      start_time,
      end_time,
      booking_id,
      status,
    });
  });

  const customerData = Object.keys(customerBookings).map((customer_name) => {
    const bookings = customerBookings[customer_name];
    const bookingCount = bookings.length;
    return { customer_name, bookings, bookingCount };
  });

  res.status(200).json({
    message: "Successfully fetched customer booked Count details",
    customerData,
  });
};

// Home Page
export const homePage = (req, res) => {
  res.status(200).send(
    `<h1 style="text-align:center;padding:10px;background-color:#333;color:#fff">Welcome To Hall Booking API</h1>
      <ul>
    <li>
    <h3>Get: Use the endpoint to <span style="background-color:yellow">/hall-api/all-room-details</span> to get the All Room Details</h3>
    </li>
    <li>
    <h3>Post: Change the endpoint to <span style="background-color:yellow">/hall-api/create-room</span> to Create the New Room</h3>
    </li>
    <li>
    <h3>Post: Change the endpoint to <span style="background-color:yellow">/hall-api/book-room</span>
     to Book a New Room</h3>
    </li>
    <li>
    <h3>Get: Change the endpoint to <span style="background-color:yellow">/hall-api/all-booked-rooms</span> to retrieve Booked Room Data</h3>
    </li>
    <li>
    <h3>Get: Change the endpoint to <span style="background-color:yellow">/hall-api/customers-booked-data</span> to retrieve Data of Booked Customers and Rooms</h3>
    </li>
    <li>
    <h3>Get: Change the endpoint to <span style="background-color:yellow">/hall-api/customer-booking-count</span> to retrieve Booking Counts and Room Data for Booked Customers</h3>
    </li>
    </ul> 
      `
  );
};
