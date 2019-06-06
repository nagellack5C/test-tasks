"""Напишите программу на Python 3, которая будет при запуске сохранять список заголовков текущих новостей
с главной страницы сайта yandex.ru (те, что выше поисковой строки) в текстовый документ в папке нахождения
программы в формате 1 заголовок = 1 строка. В приложении приложите текст программы или ссылку на файл программы"""

# in real life I would use requests and bs, this is a quick and dirty solution that uses only the standard libs.
# I thought it wasn't feasible to create a makeshift HTML parser for a simple task

import re
import urllib.request

url = 'https://yandex.ru'

with urllib.request.urlopen(url) as conn:
    htmlbody = (conn.read().decode("utf-8"))
    #regex matching news links. It's not pretty but the code is short
    x = re.findall(
      r'(home-link_black_yes" aria-label=")(.*?)(" href="https:\/\/news\.yandex\.ru\/story\/)',
      htmlbody)
    headlines = []
    # extracting first 5 matches and removing extra content from the last link.
    # Could be done in regex but would make it less readable
    for i in x[:5]:
        headlines.append(i[1])
    headlines[4] = headlines[4].replace('" tabIndex="-1', '')

with open("headlines.txt", "w") as headlines_file:
    for i in headlines:
        headlines_file.write(i + "\n")
