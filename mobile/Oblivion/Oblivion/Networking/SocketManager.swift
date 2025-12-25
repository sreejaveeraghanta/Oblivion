import Foundation
import SocketIO

final class SocketService : ObservableObject {
    static let shared = SocketService()

    private let manager: SocketManager
    let socket: SocketIOClient

    @Published var isConnected = false
    @Published var errorMessage: String?

    private init() {
        manager = SocketManager(
            socketURL: Config.serverURL,
            config: [
                .log(true),
                .compress,
                .forceWebsockets(true)
            ]
        )

        socket = manager.defaultSocket

        socket.on(clientEvent: .connect) { _, _ in
            DispatchQueue.main.async {
                self.isConnected = true
            }
            print("Connected to server")
        }

        socket.on("error") {data, _ in
            DispatchQueue.main.async {
                self.errorMessage = data.first as? String
            }
        }
    }

    func connect() {
        socket.connect()
    }

    func disconnect() {
        socket.disconnect()
    }

    func joinRoom(roomID: String, playerName: String) {
        socket.emit("joinRoom", [
            "roomId": roomID,
            "playerName": playerName
        ])
    }

}
