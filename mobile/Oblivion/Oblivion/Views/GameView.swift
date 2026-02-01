import SwiftUI

struct GameView: View {
    let roomCode: String
    let playerName: String

    var body: some View {
        VStack {
            HStack
            {
                Text("Room Code: \(roomCode)")
                    .font(.system(size: 20))
                    .padding()
                Text("Your Name: \(playerName)")
                    .font(.system(size: 20))
                    .padding()
            }
            Spacer()
                
        }.navigationBarBackButtonHidden(true) // user can only exit the game if they specifically choose to.
           
    }
}
