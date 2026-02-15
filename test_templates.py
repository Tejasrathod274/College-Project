"""
Quick test to verify templates render correctly
"""
from flask import Flask, render_template

app = Flask(__name__)
app.config['SECRET_KEY'] = 'test-key'

@app.route('/')
def test_index():
    return render_template('index.html', logged_in=False)

@app.route('/test-profile')
def test_profile():
    user = {
        'email': 'test@example.com',
        'full_name': 'Test User',
        'phone': '1234567890',
        'dob': None,
        'gender': None,
        'city': None,
        'country': 'India'
    }
    bookings = []
    return render_template('profile.html', user=user, bookings=bookings, active_tab='personal')

@app.route('/test-guide-dashboard')
def test_guide_dashboard():
    return render_template('guide-dashboard.html', 
                         guide_name='Test Guide',
                         assigned_destination='Kerala',
                         bookings=[],
                         stats={'total_bookings': 0, 'confirmed_bookings': 0, 'total_earnings': 0})

if __name__ == '__main__':
    print("✅ Testing template rendering...")
    print("✅ If this runs without errors, templates are working!")
    app.run(debug=True, port=5001)
