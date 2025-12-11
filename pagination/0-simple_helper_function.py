#!/usr/bin/env python3
"""
Function that helps with pagination.
Returns the start and end indexes for a given page.
"""


def index_range(page: int, page_size: int):
    """
    Returns the start and end indexes for a page.
    """

    start = (page - 1) * page_size
    end = start + page_size

    return (start, end)
