import SwiftUI

struct JoinRoomView: View {
    @State private var roomCode: String = ""
    @State private var playerName: String = ""

    @ObservedObject private var socket = SocketService.shared

    var body: some View {
        VStack(spacing: 20) {
            Text("Join Game")
                .font(.largeTitle)
                .padding()
            
            TextField("Room Code", text: $roomCode)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()

            TextField("Player Name", text: $playerName)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()

            Button(action: {
                socket.joinRoom(roomID: roomCode, playerName: playerName)
            }) {
                Text("Join Room")
                    .padding()
                    .background(Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(8)
            }
            .disabled(roomCode.isEmpty || playerName.isEmpty || !socket.isConnected)

            if let errorMessage = socket.errorMessage {
                Text("Error: \(errorMessage)")
                    .foregroundColor(.red)
            }

            if socket.isConnected {
                Text("Connected to server")
                    .foregroundColor(.green)
            } else {
                Text("Connecting...")
                    .foregroundColor(.gray)
            }
        }
        .padding()
        .onAppear {
            socket.connect()
        }
        .onDisappear {
            socket.disconnect()
        }
    }
}