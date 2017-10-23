// Use this file only for creating a structure for the json table, to be used as database


// one instance of the users table
const usersTableExample = {
  "users": [
    {
      "id": "H1zTrjmT-",
      "username": "testera",
      "password": "asd",
      "role": "basic",
      "activeConversationsIds": [
        {
          "id": "some_conversation_id",
          "participenIds": ["id_one"]
        },
        {
          "id": "some_conversation_id", // this is group
          "participenIds": ["id_one", "id_two", "id_three"]
        }
      ]
    }
  ]
}

// conversations table
const conversationsByIdExample = {

  "conversationsById": {

    "some_conversation_id": {
      "messages": [
        {
          "senderId": "some_senderId",
          "sentAt": "1/1/21",
          "data": "hello"
        },
        {
          "senderId": "some_senderId",
          "sentAt": "1/1/21",
          "data": "hello"
        }
      ]
    },
    "another_conversation_id": {
      "messages": [
        {
          "senderId": "some_senderId",
          "sentAt": "1/1/21",
          "data": "hello"
        },
        {
          "senderId": "some_senderId",
          "sentAt": "1/1/21",
          "data": "hello"
        }
      ]
    }
  }
};