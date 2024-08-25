import logging
import colorlog

def setup_logging(level=logging.DEBUG):
    logger = logging.getLogger()
    logger.setLevel(level)

    console_handler = logging.StreamHandler()
    console_handler.setLevel(level)

    formatter = colorlog.ColoredFormatter(
        "%(log_color)s%(asctime)s [%(levelname)s] %(name)s :  %(message)s",
        datefmt='%H:%M:%S',
        log_colors={
            'DEBUG': 'cyan',
            'INFO': 'green',
            'WARNING': 'yellow',
            'ERROR': 'red',
            'CRITICAL': 'bold_red',
        }
    )
    console_handler.setFormatter(formatter)
    
    if not logger.hasHandlers():
        logger.addHandler(console_handler)
