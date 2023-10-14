import numpy as np
from sklearn.ensemble import RandomForestClassifier
from .main import *
# Load and process the dataset
data = np.genfromtxt('/media/Training Dataset.arff', delimiter=',', skip_header=1)
labels = data[:, 30]
features = data[:, [0, 1, 2, 3, 4, 5, 6, 8, 9, 11, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 27, 29]]
print(features)
print('this')
print(labels)
# Create and train the RandomForestClassifier
clf = RandomForestClassifier(min_samples_split=7, verbose=True)
clf.fit(features, labels)

# Print feature ranking
importances = clf.feature_importances_
indices = np.argsort(importances)[::-1]
print("Feature ranking:")
for f in range(features.shape[1]):
    print("%d. feature %d (%f)" % (f + 1, indices[f], importances[indices[f]]))
# Purpose - Receive the call for testing a page from the Chrome extension and return the result (SAFE/PHISHING)
# for display. This file calls all the different components of the project (The ML model, features_extraction) and
# consolidates the result.






def get_prediction_from_url(test_url):
    features_test = main(test_url)
    # Due to updates to scikit-learn, we now need a 2D array as a parameter to the predict function.
    features_test = np.array(features_test).reshape((1, -1))



    pred = clf.predict(features_test)
    return int(pred[0])


if get_prediction_from_url('https://www.youtube.com/') == -1:
    print('its not safe')

else:
    print('its may sus or safe  safe')