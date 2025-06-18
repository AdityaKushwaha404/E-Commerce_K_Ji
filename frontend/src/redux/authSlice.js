import { createSlice , createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


//  Receive user info and token from local storage if available

const userFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;   


//   check for an existing guest id in local storage or generate a new one
const initialGuestId = localStorage.getItem('guestId') || `guest_${Date().getTime()}`;

localStorage.setItem('guestId', initialGuestId);