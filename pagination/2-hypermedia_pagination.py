#!/usr/bin/env python3
"""
Helper functions and a class for paginating a dataset.
"""

import csv
import math
from typing import List, Dict


def index_range(page: int, page_size: int):
    """
    Returns the start and end indexes for a page.
    """

    start = (page - 1) * page_size
    end = start + page_size

    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """
        Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
        Return a list of rows for the requested page.
        """
        assert type(page) is int
        assert page > 0
        assert type(page_size) is int
        assert page_size > 0

        start, end = index_range(page, page_size)
        dataset = self.dataset()
        return dataset[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """
        Return a dictionary with pagination information.
        """
        assert type(page) is int
        assert page > 0
        assert type(page_size) is int
        assert page_size > 0

        data = self.get_page(page, page_size)
        page_size_returned = len(data)

        dataset = self.dataset()
        total_pages = math.ceil(len(dataset) / page_size)

        next_page = page + 1 if page < total_pages else None
        prev_page = page - 1 if page > 1 else None

        return {
            "page_size": page_size_returned,
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }
