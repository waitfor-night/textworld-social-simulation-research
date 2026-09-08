import json
import os
import tempfile
import unittest
from unittest.mock import patch

import server


class BookmarkTest(unittest.TestCase):
    def test_round_trip_and_validation(self):
        with tempfile.TemporaryDirectory() as tmp:
            path = os.path.join(tmp, "bookmarks.json")
            with patch.object(server, "BOOKMARKS_FILE", path):
                saved = server.save_bookmark("papers", "2609.05269", {
                    "purposes": ["cite", "track", "invalid"],
                    "priority": "important",
                })
                self.assertEqual(saved["papers"]["2609.05269"], {
                    "purposes": ["cite", "track"], "priority": "important"
                })
                self.assertEqual(server.load_bookmarks(), saved)
                self.assertIsNone(server.save_bookmark("papers", "../bad", {}))
                server.save_bookmark("papers", "2609.05269", {})
                with open(path, encoding="utf-8") as f:
                    self.assertEqual(json.load(f)["papers"], {})


if __name__ == "__main__":
    unittest.main()
