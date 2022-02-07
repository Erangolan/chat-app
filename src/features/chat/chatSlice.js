import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'

const chatAdapter = createEntityAdapter()
const initialState = chatAdapter.getInitialState({
  messages: [],
  userName: '',
  socket: null,
  status: 'idle',
  error: null,
  tmpMsg: '',
})

export const sendMsg = createAsyncThunk(
  '/chat/sendMsg', async (input, { getState }) => {
    try {
      const { chat } = getState()
      await fetch(
        `http://localhost:4001/message-delivery?socketId=${chat.socket}&userTxt=${input}&name=${chat.userName}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        })

    } catch(err) {
      console.log(err)
    }
  }
)

export const startChannel = createAsyncThunk(
  '/chat/startChannel', async (socket, { getState }) => {
    try {
      const { chat } = getState()
      await fetch(`http://localhost:4001/notifications?id=${socket.id}&name=${chat.userName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      return socket.id
    } catch(err) {
      console.log(err)
    }
  }
)

const ChatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setInitMessages(state, { payload }) {
      state.messages = payload
    },
    addMsg(state, { payload }) {
      state.messages.push(payload)
    },
    setUserName(state, { payload }) {
      state.userName = payload
    },
    setMsg(state, { payload }) {
      state.tmpMsg = payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(startChannel.fulfilled, (state, { payload }) => {
        state.socket = payload
      })
  },
})

export default ChatSlice.reducer
export const {
  setInitMessages,
  addMsg,
  setUserName,
  setMsg,
} = ChatSlice.actions
