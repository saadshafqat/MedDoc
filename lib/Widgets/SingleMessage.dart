import 'package:flutter/material.dart';

import '../Styles/styles.dart';


class SingleMessage extends StatelessWidget {
  final String message;
  final bool isMe;
  SingleMessage({
    required this.message,
    required this.isMe
  });
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: isMe ? MainAxisAlignment.end : MainAxisAlignment.start,
      children: [
        Container(
            padding: EdgeInsets.all(16),
            margin: EdgeInsets.all(16),
            constraints: BoxConstraints(maxWidth: 200),
            decoration: BoxDecoration(
                color: isMe ? Styles.secondryColor : Styles.primaryColor,
                borderRadius: BorderRadius.all(Radius.circular(12))
            ),
            child: Text(message,style: TextStyle(color: Colors.white,),)
        ),
      ],

    );
  }
}