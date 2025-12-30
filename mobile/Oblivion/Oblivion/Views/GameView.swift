import SwiftUI

struct GameView: View {
    let roomCode: String
    let playerName: String

    var body: some View {
        VStack {
            Text("Room Code: \(roomCode)")
                .font(.largeTitle)
                .padding()
            Text("Your Name: \(playerName)")
                .font(.largeTitle)
                .padding()
        }
    }
}
