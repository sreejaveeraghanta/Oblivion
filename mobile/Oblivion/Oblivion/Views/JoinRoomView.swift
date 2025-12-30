import SwiftUI

struct JoinRoomView: View {
    @State private var roomCode: String = ""
    @State private var playerName: String = ""

    @ObservedObject private var socket = SocketService.shared

    var body: some View {
        VStack(spacing: 20) {
            Spacer()
            Text("Join Game")
                .font(.largeTitle)
                .padding()
            
            TextField("Room Code", text: $roomCode)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .multilineTextAlignment(.center)
                .padding()
            TextField("Player Name", text: $playerName)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .multilineTextAlignment(.center)
                .padding()

            Button(action: {
                socket.joinRoom(roomID: roomCode, playerName: playerName)
            }) {
                Text("Join Room")
                    .padding(10)
                    .background(Color.black)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
            .disabled(roomCode.isEmpty || playerName.isEmpty || !socket.isConnected)
            Spacer()

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
        .navigationDestination(isPresented: $socket.playerJoined) {
          GameView(roomCode: self.roomCode, playerName: self.playerName)
        }
    }
}
