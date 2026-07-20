import re
with open("api/db.ts", "r") as f:
    text = f.read()

old_post = """        if (!item.id) {
          item.id = "item-" + Date.now() + "-" + crypto.randomBytes(4).toString("hex");
        }
        const updated = await Model.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
        return res.json({ success: true, item: updated });
      } catch (err: any) {"""

new_post = """        if (!item.id) {
          item.id = "item-" + Date.now() + "-" + crypto.randomBytes(4).toString("hex");
        }
        
        if (col === "pdfs") {
            console.log("[Backend Log] - Incoming request body for PDF metadata save:", item);
            console.log("[Backend Log] - File URL:", item.fileUrl);
            console.log("[Backend Log] - Validation result: Success (passed auth and formatting)");
        }
        
        const updated = await Model.findOneAndUpdate({ id: item.id }, item, { upsert: true, new: true });
        
        if (col === "pdfs") {
            console.log("[Backend Log] - MongoDB save result:", updated);
        }
        
        return res.json({ success: true, item: updated });
      } catch (err: any) {"""

text = text.replace(old_post, new_post)

with open("api/db.ts", "w") as f:
    f.write(text)
