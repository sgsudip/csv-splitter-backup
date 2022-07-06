import os
import sys
import csv
import uuid
import pandas as pd

if len(sys.argv) != 4:
    print("Invalid call try 'python3 split_csv.py (input_file) (lines_per_file)")
    exit(1)

file_path = sys.argv[1]
# print(file_path)
file_name = sys.argv[2]
# print(file_name)
no_of_files = int(sys.argv[3])
# print(no_of_files)
no_of_files = max(no_of_files, 1)
# print(no_of_files)
# read the csv file returns object
csv_file = pd.read_csv(os.getcwd() + file_path)
# get the headers
header = csv_file.columns
# get the rows
rows = csv_file.values
# print("header")
# print(header)
# print("rows")
# print(rows)
# print("header array")
# print(header.to_list())
lines_indexes = []
split_data = []
file_paths = []
# print(list([header]))
# rows = list([header]) + list(rows)
# print("rows")
# print(rows)
# print(len(rows))
# print(no_of_files)
if len(rows) % no_of_files == 0:
    # print("if block")
    no_of_rows_per_file = int(len(rows)/no_of_files)
    iter = 0
    while iter < len(rows):
        lines_indexes.append([iter, min(len(rows),iter + no_of_rows_per_file)])
        iter = iter + no_of_rows_per_file
        # print(lines_indexes)
    # rem=int(len(rows)%no_of_files)
    # pdrows=no_of_rows_per_file*no_of_files
    # i = 0
    # tmp=[]
    # for i in range(len(rows)):
    #     tmp.append(i)
    #     i+=no
  

    lines_indexes.append(final)
    print(lines_indexes)
    for interval in lines_indexes:
    #   print(interval)
      current_data = rows[interval[0]:interval[1]]
    #   print("current data")
    #   print(current_data)
      split_data.append(current_data)
    #   print(split_data)


    count = 1
    for data in split_data:
      relative_path = '/tmp/' + str(uuid.uuid4()) + file_name.split('.')[0] + '_' + str(count) + '.' + file_name.split('.')[1]
      path = os.getcwd() + relative_path
      f = open(path, 'w')
      writer = csv.writer(f, delimiter = ',')
      writer.writerows(data)
      file_paths.append(relative_path)  
    
    
    # dataarray = []
    # dataarray.append(split_data)
    # dataarray.append(file_paths)
    sys.stdout.flush()     
    print(file_paths)
else:
    # print("else block")
    # print(rows)
    no_of_rows_per_file = int(len(rows)/no_of_files)
    iter = 0
    num=no_of_rows_per_file*no_of_files
    while iter < len(rows):
        lines_indexes.append([iter, min(len(rows),iter + no_of_rows_per_file)])
        iter = iter + no_of_rows_per_file
        # print(lines_indexes)

    last=lines_indexes.pop()
    secondlast=lines_indexes.pop()
    farr=[secondlast[0],last[1]]
    lines_indexes.append(farr)
    # final=secondlast.extend(last)
    # print(final)
    # lines_indexes.append(final)
    # print(lines_indexes)
    # print(lines_indexes.pop())
    # print(lines_indexes.pop())
    for interval in lines_indexes:
    #   print(interval)
      current_data = rows[interval[0]:interval[1]]
    #   print("CURRENT DATA")
    #   print(current_data)
      split_data.append(current_data)
    #   print("split data")
    #   print(split_data)


    # tmp=split_data[len(split_data)-2]+split_data[len(split_data)-1]
   
    # split_data[len(split_data)-2]=tmp
    # split_data.pop()
    count = 1
 
    for data in split_data:
    #   sys.stdout.flush()
    #   print("data")
    #   print(data)
      relative_path = '/tmp/' + str(uuid.uuid4()) + file_name.split('.')[0] + '_' + str(count) + '.' + file_name.split('.')[1]
      path = os.getcwd() + relative_path
      f = open(path, 'w')
      writer = csv.writer(f, delimiter = ',')
      writer.writerows(data)
    #   print(f)
      file_paths.append(relative_path)  

    # dataarray = []
    # dataarray.append(split_data)
    # dataarray.append(file_paths)
    sys.stdout.flush() 
    # print("tmp")
    # print(tmp)  
    print(file_paths)  



