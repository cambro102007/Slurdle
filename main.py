from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import cv2
from deepface import DeepFace

# 1) Run main.py
# 2) python3 -m http.server 727 in new term
# 3) go to http://127.0.0.1:727/main.html

class Handler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/check-object':
            result = custom_stream()
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            response = {'access': result}
            self.wfile.write(json.dumps(response).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def do_OPTIONS(self):
        # Handle CORS bs
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def custom_stream():
    cap = cv2.VideoCapture(0)
    frame_skip = 5
    frame_count = 0
    race_counts = {}

    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                break

            if frame_count % frame_skip == 0:
                try:
                    #cheking out the frames ;)
                    results = DeepFace.analyze(frame, actions=['race'], enforce_detection=False)
                    dominant_race = results[0]['dominant_race'] if isinstance(results, list) and results else results.get('dominant_race', None)

                    if dominant_race:
                        race_counts[dominant_race] = race_counts.get(dominant_race, 0) + 1

                    if sum(race_counts.values()) > 6:
                        break

                except Exception as e:
                    print("Error:", str(e))

            frame_count += 1

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    finally:
        cap.release()
        cv2.destroyAllWindows()

    final_race = max(race_counts, key=race_counts.get, default=None)
    
    # Grant or deny access based on if your black or not :)
    if final_race and final_race != "black":
        return "granted"
    else:
        return "denied"

if __name__ == '__main__':
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, Handler)
    print('Running server...')
    httpd.serve_forever()