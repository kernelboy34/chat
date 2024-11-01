import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';

class ChatScreen extends StatefulWidget {
  const ChatScreen({super.key});

  @override
  State<ChatScreen> createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Map<String, dynamic>> _messages = [];
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    _fetchMessages();


    _timer = Timer.periodic(Duration(seconds: 5), (Timer t) {
      _fetchMessages();
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  Future<void> _fetchMessages() async {
    final response = await http.get(Uri.parse('http://localhost:3000/auth/firebase/1'));

    if (response.statusCode == 200) {
      List<dynamic> data = json.decode(response.body);
      setState(() {
        _messages.clear();
        _messages.addAll(data.map((msg) {
          return {
            'mensaje': msg['mensaje'],
            'hora_envio': msg['hora_envio'] != null ? DateTime.parse(msg['hora_envio']) : DateTime.now(), // Convertir hora_envio a DateTime o asignar fecha actual si es null
          };
        }).toList());

        _messages.sort((a, b) => a['hora_envio'].compareTo(b['hora_envio']));
      });
    } else {
      throw Exception('Failed to load messages');
    }
  }

  Future<void> _sendMessage() async {
    final text = _controller.text.trim();
    if (text.isNotEmpty) {
      _controller.clear();

      final DateTime now = DateTime.now();
      final newMessage = {
        'mensaje': text,
        'hora_envio': now,
      };

      try {
        final response = await http.post(
          Uri.parse('http://localhost:3000/auth/firebase/1/messages'),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: json.encode({
            'id': '2AsI4S7TJwb4eR3pwV1u',
            'usuario': 'usuarioEjemplo',
            'contraseña': 'contraseñaEjemplo',
            'mensaje': text,
            'hora_envio': now.toIso8601String(),
          }),
        );

        if (response.statusCode == 200) {
          setState(() {
            _messages.add(newMessage);
            _messages.sort((a, b) => a['hora_envio'].compareTo(b['hora_envio'])); // Mantener orden
          });
        } else {
          print("Error al enviar el mensaje: ${response.statusCode}");
        }
      } catch (e) {
        print("Excepción: $e");
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[800],
      appBar: AppBar(
        backgroundColor: Colors.red,
        title: const Text(
          'Nuestro chat secreto 🖤',
          style: TextStyle(color: Colors.white),
        ),
        leading: IconButton(
          icon: const Icon(Icons.menu, color: Colors.white),
          onPressed: () {
            // Acción para el menú
          },
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(16.0),
              itemCount: _messages.length,
              itemBuilder: (context, index) {
                final message = _messages[index]['mensaje'];
                final isUserMessage = index % 2 == 0;
                return Align(
                  alignment: isUserMessage ? Alignment.centerRight : Alignment.centerLeft,
                  child: Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 16.0,
                      vertical: 10.0,
                    ),
                    margin: const EdgeInsets.only(bottom: 10.0),
                    decoration: BoxDecoration(
                      color: isUserMessage ? Colors.black : Colors.red[900],
                      borderRadius: BorderRadius.only(
                        topLeft: const Radius.circular(20.0),
                        topRight: const Radius.circular(20.0),
                        bottomLeft: isUserMessage ? const Radius.circular(20.0) : Radius.zero,
                        bottomRight: isUserMessage ? Radius.zero : const Radius.circular(20.0),
                      ),
                    ),
                    child: Text(
                      message,
                      style: const TextStyle(color: Colors.white),
                    ),
                  ),
                );
              },
            ),
          ),
          // Barra de entrada de mensaje
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 8.0, vertical: 8.0),
            color: Colors.grey[900],
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    style: const TextStyle(color: Colors.white),
                    decoration: InputDecoration(
                      hintText: 'Escribe un mensaje...',
                      hintStyle: const TextStyle(color: Colors.grey),
                      filled: true,
                      fillColor: Colors.black54,
                      contentPadding: const EdgeInsets.symmetric(
                        vertical: 10.0,
                        horizontal: 20.0,
                      ),
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(20),
                        borderSide: BorderSide.none,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 8.0),
                FloatingActionButton(
                  backgroundColor: Colors.red,
                  onPressed: _sendMessage,
                  child: const Icon(Icons.send, color: Colors.white),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}





